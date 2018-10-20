import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CompleteTransactions from "../components/CompleteTransactions.js";
import axios from "axios";

const HOST = "http://localhost:3001";
const url = HOST + `/transactions`;

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: []};
  }

  updateData(config) {
    this.setState(config);
  }

  componentWillMount() {
    axios
      .get(url)
      .then(response => this.setState({ transactions: response.data }))
      .catch(err => {
        console.log(err.response);
      });
  }

  
  render() {
    var { transactions } = this.state;
    console.log(transactions);

    var rendertransactions = () => {
      if (transactions.length === 0) {
        return <p>No Transactions found</p>;
      } else {
        return transactions.map(transaction => (
          <CompleteTransactions {...transaction} />
        ));
      }
    };

    return (

    <div className="container">
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Time</th>
              <th>Total</th>
              <th>Quantity</th>
              <th>Open</th>
            </tr>
          </thead>
          <tbody>{rendertransactions()}</tbody>
        </table>
    </div>
    );
  }
}

export default Transactions;