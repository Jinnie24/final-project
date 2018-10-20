import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ProductData from './ProductData';
import Autosuggest from 'react-autosuggest';
import axios from "axios";
// import Product from "./Product";

export default ({ products,selectedProducts,update,type,inventoryState,selectedImportProducts,initialproducts }) => {
    const HOST = "http://localhost:3001";
    if (!products) { return ('Select smth please'); }
    let totalprice=0;
    let selimportprod = products.filter((product) => {
        return !!selectedImportProducts[product['_id']];
         // console.log(product);
    });
    const selimportprodview = selimportprod.map((product, index) => {
        // totalprice=totalprice+product.price*+selectedImportProducts[product._id];
        // totalprice=totalprice+product.price*+selectedImportProducts[product._id];
        return (<ProductData key={product._id}
                             product={product}
                             selectedProducts={selectedProducts}
                             index={index}
                             keyto={product._id}
                             update={update}
                             type={type}
                             inventoryState={inventoryState}
                             selectedImportProducts={selectedImportProducts}/>);
    });
    // console.log(initialproducts);
    const sendOrder = startproducts =>{
        console.log('Send order');

        totalprice=0;
        let totalquantity=0;
        for (let i=0; i<selimportprod.length; i++) {
            let val = selimportprod[i]._id
            selimportprod[i].quantity = selectedImportProducts[val][0];
            totalquantity+=selectedImportProducts[val][0];
            totalprice += selimportprod[i].quantity*selimportprod[i].price
        }
        

        let newTransaction = {
            items : selimportprod,
            invoiceType : "add",
            total : totalprice,
            totalquantity:totalquantity
        }
        console.log(newTransaction);
        axios
            .post(HOST + `/transactions/create`, newTransaction)
            .catch(err => {
                console.log(err.response)
            });

        axios
            .put(HOST + `/inventory/products`, newTransaction)
            .catch(err => {
                console.log(err.response)
            });
        // console.log(initialproducts);
        let newproductarr=initialproducts.map((newproduct, index) => {
            if(!!selectedImportProducts[newproduct['_id']]){
                let newprodobj = Object.assign({},newproduct);
                newprodobj['quantity'] = +newproduct['quantity']+selectedImportProducts[newproduct['_id']][1];
                return newprodobj;
            }else{
                return newproduct;
            }
        });
        // console.log(newproductarr);
         update({inventoryState: 'inventoryShow',products:newproductarr});
        // window.location.reload();
           
    }

    if(Object.keys(selectedImportProducts).length===0){
        return (
            <div>
                <Table className="table user-list">
                    <TableHead>
                        <TableRow className="inv-table">
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Price</TableCell>
                            <TableCell numeric>Quantity to add</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className="empty-selected">
                            Add something
                            <a
                            className="btn btn-success"
                            onClick={() => update({productFormModal: true})}
                            >
                            <i className="glyphicon glyphicon-plus"/>     Add New Item
                            </a>
                        </TableRow>
                    </TableBody>
                </Table>
                <div>

                </div>
            </div>
        );
    }else {
        return (
            <div>
                <Table className="table user-list">
                    <TableHead>
                        <TableRow className="inv-table">
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Price</TableCell>
                            <TableCell numeric>Quantity to add</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selimportprodview}
                    </TableBody>
                </Table>
                <div className={"text-right import-total"}>
                    <a
                        className="btn btn-success"
                        onClick={sendOrder}
                    >
                        <i className="glyphicon glyphicon-shopping-cart"/> ADD NEW PRODUCTS
                    </a>
                </div>
            </div>
        );
    }
};