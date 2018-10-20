
import React, { Component } from "react";

class TransactionDetail extends Component {
  render() {
    var { quantity, name, price,totalquantity } = this.props;
    var productTotal = parseInt(quantity, 10) * parseInt(price, 10);
    return (
      <tbody>
        <tr>
          <td> {quantity} </td>
          <td>
            <p>{name}</p>
          </td>
          <td>
            <span>{productTotal}</span>
            <br />
            <small className="small-text">
              <em>${price} each</em>
            </small>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default TransactionDetail;