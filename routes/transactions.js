const router = require("express").Router();
const transactionsController = require("../controllers/transactionsController");


router.route("/")
    .get(transactionsController.findAll)
    .post(transactionsController.create);

router.route("/create")
    .post(transactionsController.create);

router.route("/all")
    .get(transactionsController.findAll)

router.route("/limited")
    .get(transactionsController.findLimited);

router.route("/today")
    .get(transactionsController.findToday);

router.route("/byday")
    .get(transactionsController.findByDate);

router
    .route("/:id")
    .get(transactionsController.findById)

module.exports = router;