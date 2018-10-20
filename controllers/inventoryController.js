const db = require("../models");
const async = require("async");

// Defining methods for the InventoryController
module.exports = {
  findAll: function(req, res) {
    db.Inventory
      .find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Inventory
      .findById(req.body._id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    var newProduct = req.body;
    console.log(newProduct);
    db.Inventory
      .create(newProduct)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // update: function(req, res){
  //    db.Inventory
  //     .findOneAndUpdate({ _id: req.body._id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  updateByTransaction: function(req, res) {
    const items = req.body.items;
    const invoiceType = req.body.invoiceType;
    let updateQuantityBy = 0;
    for (i=0; i < items.length; i++) {
      if(invoiceType == "add"){
        updateQuantityBy =
          parseInt(items[i].quantity);
      } else if (invoiceType == "subtract") {
        updateQuantityBy =
          (-parseInt(items[i].quantity));
          console.log(updateQuantityBy);
      }
      let conditions = { _id: items[i]._id }, 
      update = { $inc: { quantity: updateQuantityBy }};

      db.Inventory.update(conditions, update, {multi: true}, callback);
      
      function callback (err, numAffected) {
        if (err) {
          console.log(err.response);
        } else {
          console.log(numAffected+ " record updated!");
        }
      }
    } 
  },
  remove: function(req, res) {
    db.Inventory
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  // updateByTransaction(transaction) {
  //   async.eachSeries(transaction.items, function(transactionProduct) {
  //     db.Inventory.findOne({ _id: transactionProduct._id }, function(
  //       err,
  //       product
  //     ) {
  //       if(transaction.invoiceType = "add"){
  //         var updatedQuantity =
  //           parseInt(poduct.quantity) +
  //           parseInt(transactionProduct.quantity);
  //       } else if (transaction.invoiceType = "subtract") {
  //         var updatedQuantity =
  //           parseInt(poduct.quantity) -
  //           parseInt(transactionProduct.quantity);
  //       }
  //         db.Inventory.update(
  //           { _id: product._id },
  //           { $set: { quantity: updatedQuantity } },
  //           {}
  //         );
  //     });
  //   });
  // }
};
