const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const auth = require("../auth/middleware");
const User = require("../models/").user;
const Club = require("../models/").club;
const Evolution = require("../models/").evolution;
const Tamagotchi = require("../models/").tamagotchi;
const UserClub = require("../models/").userClub;
const router = new Router();

//GET all clubs including user and tamagotchi model
router.get("/", async (req, res, next) => {
  try {
    res.send(
      await Club.findAll({
        include: [{ model: User }],
      })
    );
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//GET one specific club including user model
router.get("/:id", async (req, res, next) => {
  try {
    const specificClub = await Club.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    if (!specificClub) {
      res.status(404).send(`Club with id ${req.params.id} not found`);
    } else {
      res.send(specificClub);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//PATCH edit club info

//POST new club

module.exports = router;
