const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");


router.route("/products")
  .get(inventoryController.findAll)
  .put(inventoryController.updateByTransaction);

router.route("/product")
  .get(inventoryController.findById)
  .post(inventoryController.create)

router.route("/selectedProducts")
  .post(inventoryController.create)
  .get(inventoryController.findAll);

router
  .route("/product/:id")
  .get(inventoryController.findById)
  .delete(inventoryController.remove);

module.exports = router;
