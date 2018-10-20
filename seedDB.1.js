const mongoose = require('mongoose');
const db = require("./models");
// doesn't work
// const user = db.User[0];
// const InvItems = [db.Inventory[0], db.Inventory[1]];
// const user2 = db.User[1];
// const InvItems2 = [db.Inventory[2], db.Inventory[3]];


// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/inventorysys"
);


const transactionsSeed = [
  {
    date: new Date(Date.now()),
    items: [ObjectId("5bc6472a23af4c1919ae1ab0"), ObjectId("5bc647e823af4c1919ae1ab2")],
    invoiceType: "add",
    total: 180
  }
];

db.Transactions
  .remove({})
  .then(() => db.Transactions.collection.insertMany(transactionsSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
