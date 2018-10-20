const db = require("../models");
const async = require("async");

// Defining methods for the InventoryController
module.exports = {
  findAll: function(req, res) {
    db.Transactions
        .find({})
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  findLimited: function(req, res) {
    let limit = parseInt(req.query.limit, 10);
    if (!limit) limit = 5;
    db.Transactions
        .limit(limit)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
  },
  findToday: function(req, res) {
    if (req.query.date) {
        startDate = new Date(req.query.date);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(req.query.date);
        endDate.setHours(23, 59, 59, 999);
      } else {
        // beginning of current day
        var startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        // end of current day
        var endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
      }
    
      db.Transactions
        .find(
        { date: { $gte: startDate.toJSON(), $lte: endDate.toJSON() } },
        function(err, docs) {
          var result = {
            date: startDate
          };
    
          if (docs) {
            var total = docs.reduce(function(p, c) {
              return p + c.total;
            }, 0.0);
    
            result.total = parseFloat(parseFloat(total).toFixed(2));
    
            res.send(result);
          } else {
            result.total = 0;
            res.send(result);
          }
        }
      );
  },
  findByDate: function(req, res) {
    var startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
  
    var endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
  
    db.Transactions.find(
      { date: { $gte: startDate.toJSON(), $lte: endDate.toJSON() } },
      function(err, docs) {
        if (docs) res.send(docs);
      }
    );
  },
  create: function(req, res) {
    const newTransaction = req.body;

    db.Transactions.create(newTransaction, function(err, transaction) {
      if (err) res.status(500).send(err);
      else {
        res.sendStatus(200);
      }
    });

  },
  findById: function(req, res) {
    db.Transaction
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
