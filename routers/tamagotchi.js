const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const auth = require("../auth/middleware");
const User = require("../models/").user;
const Club = require("../models/").club;
const Evolution = require("../models/").evolution;
const Tamagotchi = require("../models/").tamagotchi;
const UserClub = require("../models/").userClub;
const router = new Router();

//GET all tamagotchis including user model

//GET specific tamagotchi including user model

//POST new tamagotchi

//PATCH tamagotchi info

//DELETE tamagotchi
