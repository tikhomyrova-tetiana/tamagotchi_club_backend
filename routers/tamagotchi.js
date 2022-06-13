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
router.get("/", async (req, res, next) => {
  try {
    res.send(
      await Tamagotchi.findAll({
        include: [{ model: User }],
      })
    );
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//GET specific tamagotchi including user model
router.get("/:id", async (req, res, next) => {
  try {
    const specificTamagotchi = await Tamagotchi.findByPk(req.params.id, {
      include: [{ model: User }],
    });
    if (!specificTamagotchi) {
      res.status(404).send(`Tamagotchi with id ${req.params.id} not found`);
    } else {
      res.send(specificTamagotchi);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//POST new tamagotchi

//PATCH tamagotchi info

//DELETE tamagotchi

module.exports = router;
