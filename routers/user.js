const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const auth = require("../auth/middleware");
const User = require("../models/").user;
const Club = require("../models/").club;
const Evolution = require("../models/").evolution;
const Tamagotchi = require("../models/").tamagotchi;
const UserClub = require("../models/").userClub;
const router = new Router();

//GET all users including tamagotchi model
router.get("/", async (req, res, next) => {
  try {
    res.send(
      await User.findAll({
        include: [{ model: Tamagotchi }],
      })
    );
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//GET specific user including tamagotchi model
router.get("/:id", async (req, res, next) => {
  try {
    const specificUser = await User.findByPk(req.params.id, {
      include: [{ model: Tamagotchi }],
    });
    if (!specificUser) {
      res.status(404).send(`User with id ${req.params.id} not found`);
    } else {
      res.send(specificUser);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// PATCH user information

router.patch("/:id", auth, async (req, res) => {
  const { name, email, photoUrl } = req.body;
  const userId = req.user.id;
  try {
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send(`No user with that id ${userId}`);
      return;
    }

    const updatedUser = await userToUpdate.update({
      name,
      email,
      photoUrl,
    });

    if (!updatedUser) {
      res.status(404).send(`Update failed.`);
      return;
    }

    const userNewData = updatedUser.dataValues;
    res.status(200).send(userNewData);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
});

module.exports = router;
