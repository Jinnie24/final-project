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

export default ({ products,selectedProducts,update,type,inventoryState,selectedImportProducts }) => {
    const HOST = "http://localhost:3001";
    if (!products) { return ('Select smth please'); }
    let totalprice=0;
    let selprod = products.filter((product) => {
        return !!selectedProducts[product['_id']];
        //   console.log(product);
    });
    const selprodview = selprod.map((product, index) => {
        totalprice=totalprice+product.price*+selectedProducts[product._id];
        return (<ProductData key={product._id}
                             product={product}
                             selectedProducts={selectedProducts}
                             index={index}
                             keyto={product._id}
                             update={update}
                             type={type}
                             inventoryState={inventoryState}
                             selectedImportProducts={selectedImportProducts}
        />);
    });
    const sendOrder = e =>{
        console.log('Send order');
        let totalquantity=0;
        for (let i=0; i<selprod.length; i++) {
            let val = selprod[i]._id
            selprod[i].quantity = selectedProducts[val];
            totalquantity+=selprod[i].quantity;

        }
        // console.log(selectedProducts,selprod,totalprice);
        let newTransaction = {
            items : selprod,
            invoiceType : "subtract",
            total : totalprice,
            totalquantity:totalquantity
        }

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
        update({inventoryState: 'inventoryShow'});
    }
    if(Object.keys(selectedProducts).length===0){
        return (
            <div>
                <Table className="table user-list">
                    <TableHead>
                        <TableRow className="inv-table">
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Price</TableCell>
                            <TableCell numeric>Quantity to substruct</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className="empty-selected">
                            Add something from the left.
                        </TableRow>
                    </TableBody>
                </Table>
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
                            <TableCell numeric>Quantity to substruct</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selprodview}
                    </TableBody>
                </Table>
                <div className={"text-right total-price"}>Total: {totalprice}</div>
                <div className={"text-right order-total"}>
                    <a
                        className="btn btn-info"
                        onClick={sendOrder}
                    >
                        <i className="glyphicon glyphicon-shopping-cart"/> ORDER
                    </a>
                </div>
            </div>
        );
    }
};