let express = require("express");
let router = express.Router();
let classController = require("../controller/class.controller");

router.get("/getAllClasses", classController.getAllClassDetails);
router.post("/storeClass", classController.storedClassInfo);
router.delete("/deleteClass/:cid", classController.deleteClass);
router.put("/updateClass",classController.updateClassDetails);

module.exports=router;