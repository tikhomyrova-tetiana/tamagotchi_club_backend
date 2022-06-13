const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const auth = require("../auth/middleware");
const User = require("../models/").user;
const Club = require("../models/").club;
const Evolution = require("../models/").evolution;
const Tamagotchi = require("../models/").tamagotchi;
const UserClub = require("../models/").userClub;
const router = new Router();

//GET all clubs including user model

//GET one specific club including user model

//PATCH edit club info

//POST new club

//DELETE club
router.delete("/club/:id");
//DELETE user from club

module.exports = router;
