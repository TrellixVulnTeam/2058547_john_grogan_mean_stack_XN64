let express = require("express");
let router = express.Router();
let chatController = require("../controller/chat.controller");

router.post("/storeChat",chatController.storeChatInfo);
router.get("/getChats",chatController.getAllChats)

module.exports=router;