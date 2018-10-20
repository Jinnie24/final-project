// import React, { Component } from "react";
// import { Modal } from "react-bootstrap";
// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell';
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// import EditIcon from '@material-ui/icons/Edit';
// import Icon from '@material-ui/core/Icon';

// class Product extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       price: 0,
//       quantity: 0,
//       productModal: false,
//       selected: false
//     };
//   }
//   componentDidMount() {
//     this.setState({ name: this.props.name });
//     this.setState({ newName: this.props.name });
//     this.setState({ price: this.props.price });
//     this.setState({ newPrice: this.props.price });
//     this.setState({ quantity: this.props.quantity });
//     this.setState({ newQuantity: this.props.quantity });
//   }
//   handleName = e => {
//     this.setState({ newName: e.target.value });
//   };
//   handlePrice = e => {
//     this.setState({ newPrice: e.target.value });
//   };
//   handleQuantity = e => {
//     this.setState({ newQuantity: e.target.value });
//   };
//   handleProduct = e => {
//     e.preventDefault();
//     this.setState({ productModal: false });
//     console.log("id", this.props._id);
//     var editProduct = {
//       name: this.state.newName,
//       quantity: this.state.newQuantity,
//       price: this.state.newPrice,
//       _id: this.props._id
//     };

//     this.props.onEditProduct(editProduct);
//     this.setState({ name: this.state.newName });
//     this.setState({ quantity: this.state.newQuantity });
//     this.setState({ price: this.state.newPrice });
//   };
//   handleSelectedProduct = e => {
//     e.preventDefault();
//     var addProduct = {
//       name: this.state.name,
//       quantity: this.state.quantity,
//       price: this.state.price,
//       selected: true
//     };
//     this.setState({ selected: true });
//     this.props.onAddProduct(addProduct);
//   }
  
//   render() {
//     const {
//       newName,
//       newPrice,
//       newQuantity,
//       name,
//       price,
//       quantity
//     } = this.state;
//     return (
//       <TableRow>
//         <TableCell>{name}</TableCell>
//         <TableCell numeric>${price}</TableCell>
//         <TableCell numeric>{quantity}</TableCell>
//         <TableCell numeric>
//           <Button 
//           variant="fab" 
//           color="primary" 
//           aria-label="Add"
//           onClick={() => this.setState({ selected: true })}
//           >
//             <AddIcon />
//           </Button>
//           <Button 
//             variant="fab" 
//             color="secondary" 
//             aria-label="Edit" 
//             onClick={this.handleSelectedProduct}
//             >
//             <EditIcon />
//           </Button>
          
//         </TableCell>
        
//         <Modal show={this.state.productModal}>
//           <Modal.Header>
//             <Modal.Title>Edit Product</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <form className="form-horizontal" name="newProductForm">
//               <div className="form-group">
//                 <label className="col-md-4 control-label" htmlFor="name">
//                   Name
//                 </label>
//                 <div className="col-md-4">
//                   <input
//                     name="name"
//                     placeholder="Name"
//                     onChange={this.handleName}
//                     className="form-control"
//                     value={newName}
//                   />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label className="col-md-4 control-label" htmlFor="price">
//                   Price
//                 </label>
//                 <div className="col-md-4">
//                   <input
//                     name="price"
//                     placeholder="Price"
//                     className="form-control"
//                     onChange={this.handlePrice}
//                     value={newPrice}
//                     type="number"
//                     step="any"
//                     min="0"
//                   />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label
//                   className="col-md-4 control-label"
//                   htmlFor="quantity_on_hand"
//                 >
//                   Quantity On Hand
//                 </label>
//                 <div className="col-md-4">
//                   <input
//                     name="quantity_on_hand"
//                     placeholder="Quantity On Hand"
//                     onChange={this.handleQuantity}
//                     value={newQuantity}
//                     className="form-control"
//                   />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label className="col-md-4 control-label" htmlFor="image">
//                   Upload Image
//                 </label>
//                 <div className="col-md-4">
//                   <input type="file" name="image" />
//                 </div>
//               </div>
//               <br /> <br /> <br />
//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button color="primary" onClick={() => this.setState({ productModal: false })}>
//               Close
//             </Button>
//             <Button color="secondary" onClick={this.handleProduct}>Update</Button>
//           </Modal.Footer>
//         </Modal>
//       </TableRow>
      
//     );
//   }
// }

// export default Product;
