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

//GET all clubs from user
router.get("/mine", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const club = await Club.findAll();
    const mine = await UserClub.findAll({
      where: [{ userId: userId }, { clubId: club.id }],
    });
    res.send(mine);
  } catch (e) {
    console.log(e.message);
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

//DELETE club
router.delete("/club/:id");
//DELETE user from club

module.exports = router;
