const express = require("express")
const routers = express.Router()

const playerController = require("../controllers/player.controller")

routers.get("/players",playerController.getPlayer)
routers.post("/createPlayer",playerController.createPlayer)
routers.get('/next',playerController.nextPlayer);

module.exports = routers