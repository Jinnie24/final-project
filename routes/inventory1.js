const express = require('express');
const Inventory = require('mongoose').model('Inventory');
var async = require("async");

const router = new express.Router();

// GET inventory
router.get("/", (req, res) => {
    res.send("Inventory API");
  });
  
  // GET a product from inventory by _id
  router.get("/product/:id", (req, res) => {
    if (!req.params.id) {
      res.status(500).send("ID field is required.");
    } else {
      Inventory.findOne({ _id: req.params.id },(err, product) => {
        res.send(product);
      });
    }
  });
  
  // GET all inventory products
  router.get("/products", (req, res) => {
    Inventory.find({}, (err, docs) => {
      console.log("sending inventory products");
      res.send(docs);
    });
  });
  
  // post inventory product
  router.post("/product", (req, res) => {
    var newProduct = req.body;
  
    Inventory.insert(newProduct, (err, product) => {
      if (err) res.status(500).send(err);
      else res.send(product);
    });
  });
  
  //delete product using product id
  router.delete("/product/:id", (req, res) => {
    Inventory.remove({ _id: req.params.id }, (err, numRemoved) => {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    });
  });
  
  // Updates inventory product
  router.put("/product", (req, res) => {
    var productId = req.body._id;
  
    Inventory.update({ _id: productId }, req.body, {}, (
      err,
      numReplaced,
      product
    ) => {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    });
  });
  

  module.exports = router;