import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Forward';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NumericInput from 'react-numeric-input';

export default ({ product,selectedProducts,index, keyto, update, type, inventoryState, selectedImportProducts }) => {
    let thisquantity=0;

    const addToSelected = (id) => {
        if ((thisquantity>0)&&(thisquantity<=product.quantity)) {
            selectedProducts[id] = thisquantity;
            // console.log(selectedProducts);
            update({
                selectedProducts: selectedProducts
            });
        }
    };
    const addToImportSelected = (id) => {
        // console.log(id);
        console.log(selectedImportProducts);
        // // console.log(selectedProducts);

            if(!!!selectedImportProducts[id]) selectedImportProducts[id] = [0,product['quantity']];
            update({
                selectedImportProducts: selectedImportProducts
            });
    };
    const addquantity = num =>{
        if (thisquantity<=product.quantity) {
            thisquantity = num;
        }
    };
    const addquantityimport = num =>{
        selectedImportProducts[keyto][0]=num;
    };
    const deleteFromSelected = (id) => {
        delete  selectedProducts[id];
        update({
            selectedProducts: selectedProducts
        });
    };
    const deleteFromSelectedImport = (id) => {
        delete  selectedImportProducts[id];
        update({
            selectedImportProducts: selectedImportProducts
        });
    };

    if(type==='selectedlist'){
        return (
            <TableRow>
                <TableCell>{product.name}</TableCell>
                <TableCell numeric>{product.price}</TableCell>
                <TableCell numeric>{selectedProducts[keyto]}</TableCell>
                <TableCell numeric >
                     <Button
                         mini
                        className="deletebutton"
                        variant="fab"
                        color="secondary"
                        aria-label="Delete"
                        onClick={() => deleteFromSelected(keyto)}
                    >
                        <DeleteIcon/>
                    </Button>
                </TableCell>
            </TableRow>
        );
    } if(inventoryState==='importShow'){
        if(type==='importlist') {
            return (
                <TableRow>
                    <TableCell>{product.name}</TableCell>
                    <TableCell numeric>{product.price}</TableCell>
                    <TableCell numeric>
                <span className="quantity-control">
                    <NumericInput min={0} max={1000} strict={true}
                                  value={(!!selectedImportProducts[keyto]) ? selectedImportProducts[keyto][0] : 0} style={{
                        input: {
                            height: '40px',
                            width: '100px',
                            fontSize: '22px',
                            fontFamily: 'Alice, serif'
                        }
                    }}
                                  onChange={addquantityimport}
                    />
                </span>
                        <Button
                            mini
                            className="deletebutton"
                            variant="fab"
                            color="secondary"
                            aria-label="Delete"
                            onClick={() => deleteFromSelectedImport(keyto)}
                        >
                            <DeleteIcon/>
                        </Button>

                    </TableCell>
                </TableRow>
            );
        }else {
            return (
                <TableRow>
                    <TableCell>
                        <Button
                            mini
                            className="addleftbutton"
                            variant="fab"
                            color="primary"
                            aria-label="Add"
                            onClick={() => addToImportSelected(keyto)}
                        >
                            <AddIcon/>
                        </Button>
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell numeric>{product.price}</TableCell>
                    <TableCell numeric>{product.quantity}</TableCell>
                    <TableCell numeric>
                <span className="quantity-control">
                    <NumericInput min={0} max={1000} strict={true}
                                  value={0} style={{
                        input: {
                            height: '40px',
                            width: '100px',
                            fontSize: '22px'
                        }
                    }}
                                  onChange={addquantity}
                    />
                </span>
                        <Button
                            mini
                            className="editbutton"
                            variant="fab"
                            color="secondary"
                            aria-label="Edit"
                            onClick={this.handleSelectedProduct}
                        >
                            <EditIcon/>
                        </Button>
                        <Button
                            mini
                            className="addbutton"
                            variant="fab"
                            color="primary"
                            aria-label="Add"
                            onClick={() => addToSelected(keyto, thisquantity)}
                        >
                            <AddIcon/>
                        </Button>

                    </TableCell>
                </TableRow>
            );
        }

    }else {
        return (
            <TableRow>
                <TableCell>{product.name}</TableCell>
                <TableCell numeric>{product.price}</TableCell>
                <TableCell numeric>{product.quantity}</TableCell>
                <TableCell numeric >
                <span className="quantity-control">
                    <NumericInput min={0} max={product.quantity} strict={true}
                                  value={(!!selectedProducts[keyto]) ? selectedProducts[keyto] : 0} style={{
                        input: {
                            height: '40px',
                            width: '100px',
                            fontSize: '22px'
                        }
                    }}
                                  onChange={addquantity}
                    />
                </span>
                    {/* <Button
                        mini
                        className="editbutton"
                        variant="fab"
                        color="secondary"
                        aria-label="Edit"
                        onClick={this.handleSelectedProduct}
                    >
                        <EditIcon/>
                    </Button> */}
                    <Button
                        mini
                        className="addbutton"
                        variant="fab"
                        color="primary"
                        aria-label="Add"
                        onClick={() => addToSelected(keyto, thisquantity)}
                    >
                        <AddIcon/>
                    </Button>

                </TableCell>
            </TableRow>
        );
    };
};