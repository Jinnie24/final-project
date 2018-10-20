import React, {Component} from "react";
import axios from "axios";
import {Modal, Button} from "react-bootstrap";
import Paper from '@material-ui/core/Paper'
import InventoryList from '../components/InventoryList';
import SelectedList from '../components/SelectedList';
import ImportList from '../components/ImportList';
import Searchbar from '../components/SearchBar';
import Toolbar from '../components/Toolbar';


const HOST = "http://localhost:3001";


class Inventory extends Component {

    constructor(props) {
        super(props);
        // Устанавливаем состояние
        this.state = {
            products: null,
            initialproducts: null,
            selectedProducts: {},
            selectedImportProducts: {},
            active: 0,
            term: '',
            inventoryState: 'inventoryShow',
            snackMessage: "",
            handleName: "",
            handlePrice: ""
        };
        // this.handlerNewItem = this.handlerNewItem.bind(this);

        // Сразу загружаем данные
        // this.loadData();

    }

    handleName = e => {
        this.setState({name: e.target.value});
    };
    handlePrice = e => {
        this.setState({price: e.target.value});
    };

    handleNewProduct = e => {
        e.preventDefault();
        this.setState({productFormModal: false});
        var newProduct = {
            name: this.state.name,
            quantity: 0,
            price: this.state.price,
        };

        
        let nameCheck = this.state.products.some(item => item.name === this.state.name);
        if(nameCheck) {
            alert("This name is already used");
        } else {
            axios
            .post(HOST + `/inventory/product`, newProduct)
            .then(
                 window.location.reload()
                // axios.get(HOST + `/inventory/products`).then(response => {
                //     this.setState({products: response.data, initialproducts: response.data});
                //      console.log(response.data);
                // })
            )
            .catch(err => {
                console.log(err.response)
            });
        }
        

    };
  

    componentWillMount() {
        var url = HOST + `/inventory/products`;
        axios.get(url).then(response => {
            this.setState({products: response.data, initialproducts: response.data});
            // console.log(this.state);
        });
    }
    

    updateData(config) {
        this.setState(config);
    }


    render() {

        return (
            <div>

                <div className="container">

                    <div className="row">

                        <div className="col-xs-3">
                            <Searchbar
                                term={this.state.term}
                                products={this.state.initialproducts}
                                update={this.updateData.bind(this)}
                            />
                        </div>
                        <div className="col-xs-5 text-left">
                            <Toolbar initialproducts={this.state.initialproducts} products={this.state.products}
                                     update={this.updateData.bind(this)}/>


                        </div>
                        <div className={"col-xs-4"}>
                            <a
                                className="btn btn-success pull-right"
                                onClick={() => this.setState({ productFormModal: true })}
                            >
                                <i className="glyphicon glyphicon-plus"/>     Add New Item
                            </a>

                        </div>
                        <div className={"col-xs-12 flex-stretch main-buttons "+this.state.inventoryState}>
                            <a
                                className="btn btn-warning"
                                onClick={() => this.setState({inventoryState: 'importShow'})}
                            >
                                <i className="glyphicon glyphicon-import"/> Income
                            </a>
                            <a
                                className="btn btn-primary"
                                onClick={() => this.setState({inventoryState: 'inventoryShow'})}
                            >
                                <i className="glyphicon glyphicon-list"/> Inventory
                            </a>
                            <a
                                className="btn btn-info"
                                onClick={() => this.setState({inventoryState: 'cartShow'})}
                            >
                                <i className="glyphicon glyphicon-shopping-cart"/> Sale
                            </a>
                        </div>
                    </div>
                    <div className={'mainInventoryContainer ' + this.state.inventoryState}>
                        <div className="importContainer">
                            <Paper>
                                <ImportList products={this.state.products}
                                            selectedProducts={this.state.selectedProducts}
                                            update={this.updateData.bind(this)}
                                            type='importlist'
                                            inventoryState={this.state.inventoryState}
                                            selectedImportProducts={this.state.selectedImportProducts}
                                            initialproducts={this.state.initialproducts}
                                />
                            </Paper>
                        </div>
                        <div className="inventoryList">
                            <Paper>
                                <InventoryList products={this.state.products}
                                               selectedProducts={this.state.selectedProducts}
                                               update={this.updateData.bind(this)} type='' inventoryState={this.state.inventoryState} selectedImportProducts={this.state.selectedImportProducts}/>
                            </Paper>
                        </div>
                        <div className="cartContainer">
                            <Paper>
                                <SelectedList products={this.state.products}
                                              selectedProducts={this.state.selectedProducts}
                                              update={this.updateData.bind(this)} type='selectedlist'/>
                            </Paper>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.productFormModal}>
                    <Modal.Header>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-horizontal" name="newProductForm">
                            
                            <div className="form-group">
                                <label className="col-md-4 control-label" htmlFor="name">
                                    Name
                                </label>
                                <div className="col-md-4">
                                    <input
                                        name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        onChange={this.handleName}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-4 control-label" htmlFor="price">
                                    Price
                                </label>
                                <div className="col-md-4">
                                    <input
                                        name="price"
                                        placeholder="Price"
                                        className="form-control"
                                        onChange={this.handlePrice}
                                        type="number"
                                        step="any"
                                        min="0"
                                    />
                                </div>
                            </div>
                            <span className="incorrectName"></span>
                            <br/> <br/> <br/>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({productFormModal: false})}>
                            Close
                        </Button>
                        <Button onClick={this.handleNewProduct} >Submit</Button>
                    </Modal.Footer>
                </Modal>

            </div>

        );
    }

}

export default Inventory;
