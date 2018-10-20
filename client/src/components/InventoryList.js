import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ProductData from './ProductData';
import Product from "./Product";

export default ({ products,selectedProducts,update,type,inventoryState,selectedImportProducts }) => {
    if (!products) { return (<p>Loading...</p>); }
    let chkproducts;
    if(inventoryState=="cartShow"){
        chkproducts = products.filter((product) => {
            return +product.quantity>0;
        });
    }else{
        chkproducts = products.slice(0)
    }

    const prodview = chkproducts.map((product, index) => {
        // console.log(product);
        // console.log(selectedImportProducts);
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

    if(inventoryState==='importShow'){
        return (
            <Table className="table user-list">
                <TableHead>
                    <TableRow className="inv-table">
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell numeric>Price</TableCell>
                        <TableCell numeric>Quantity on Hand</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {prodview}
                </TableBody>
            </Table>
        );
    }
    else{
        return (
            <Table className="table user-list">
                <TableHead>
                    <TableRow className="inv-table">
                        <TableCell>Name</TableCell>
                        <TableCell numeric>Price</TableCell>
                        <TableCell numeric>Quantity on Hand</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {prodview}
                </TableBody>
            </Table>
        );
    }

};