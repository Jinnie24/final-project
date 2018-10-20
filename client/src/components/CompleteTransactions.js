import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import TransactionDetail from "./TransactionDetail";
import axios from "axios";

const HOST = "http://localhost:3001";
const url = HOST + `/product`;


class CompleteTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionModal: false,
      totalquantity: 0,
      items: [],
      products: []
    };
  }
  componentWillMount() {
    var url = HOST + `/inventory/products`;
    axios.get(url).then(response => {
        this.setState({products: response.data});
        // console.log(this.state);
    });
  }

//   handleProducts = (items) => {
//     let transactionItem = products.filter((product) => {
//       return items.indexOf(product["_id"]);
//     });
//     console.log(transactionItem);
// };

  render() {
    var { date, total, totalquantity,invoiceType,items} = this.props;

    console.log(items);
    // console.log(date,total,totalquantity,invoiceType);
    // this.handleProducts(items);
    var products = this.state.products;
    // console.log(products);
    // var renderQuantity = products => {
    //   var totalquantity = 0;
    //   for (var i = 0; i < products.length; i++) {
    //     totalquantity =
    //       parseInt(totalquantity, 10) + parseInt(products[i].quantity, 10);
    //   }
    //
    //   return totalquantity;
    // };
    var renderItemDetails = products => {
      // console.log('items');
      // console.log(items);
      let selproducts = products.filter(product=>{
        // console.log(product._id);
        return items.indexOf(product._id)+1;
    });
      console.log('sel');
      console.log(selproducts);
      // console.log(totalquantity);
      return selproducts.map(item => <TransactionDetail totalquantity={totalquantity} {...item} />);
    };
    if (invoiceType=='add') {
        return (
            <tr className={"transaction-" + invoiceType}>
                <td><i className="glyphicon glyphicon-import"/> Income </td>
                <td> {date}</td>
                <td> {total} </td>
                <td> {totalquantity}</td>
                <td>
                    <a
                        className="btn btn-info"
                        onClick={() => this.setState({transactionModal: true})}
                    >
                        <i className="glyphicon glyphicon-new-window"/>
                    </a>
                </td>

                <Modal show={this.state.transactionModal}>
                    <Modal.Header>
                        <Modal.Title>Transaction Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="panel panel-primary">
                            <div className="panel-heading text-center lead"><div><i className="glyphicon glyphicon-import"/> Income</div>{date}</div>

                            <table className="receipt table table-hover">
                                <thead>
                                <tr className="small">
                                    <th> Quantity</th>
                                    <th> Product</th>
                                    <th> Price</th>
                                </tr>
                                </thead>
                                {renderItemDetails(products)}
                                <tbody>
                                <tr className="total">
                                    <td/>
                                    <td>Total</td>
                                    <td> ${total} </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({transactionModal: false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        );
    }else{
        return (
            <tr className={"transaction-" + invoiceType}>
                <td><i className="glyphicon glyphicon-shopping-cart"/> Order
                </td>
                <td> {date}</td>
                <td> {total} </td>
                <td> {totalquantity}</td>
                <td>
                    <a
                        className="btn btn-info"
                        onClick={() => this.setState({transactionModal: true})}
                    >
                        <i className="glyphicon glyphicon-new-window"/>
                    </a>
                </td>

                <Modal show={this.state.transactionModal}>
                    <Modal.Header>
                        <Modal.Title>Transaction Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="panel panel-primary">
                            <div className="panel-heading text-center lead"><div><i className="glyphicon glyphicon-shopping-cart"/> Order</div>{date}</div>

                            <table className="receipt table table-hover">
                                <thead>
                                <tr className="small">
                                    <th> Quantity</th>
                                    <th> Product</th>
                                    <th> Price</th>
                                </tr>
                                </thead>
                                {renderItemDetails(products)}
                                <tbody>
                                <tr className="total">
                                    <td/>
                                    <td>Total</td>
                                    <td> ${total} </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({transactionModal: false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        );
    }
  }
}

export default CompleteTransactions;