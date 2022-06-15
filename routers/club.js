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

//GET all clubs user is member from
router.get("/mine", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const member = await UserClub.findAll({
      include: { model: Club },
      where: [{ userId: userId }],
    });
    res.send(member);
  } catch (e) {
    console.log(e.message);
  }
});

//GET all clubs user is the owner from
router.get("/owner", auth, async (req, res) => {
  try {
    const ownerId = req.user.id;
    const ownedbyuser = await Club.findAll({
      where: { ownerId: ownerId },
    });
    res.send(ownedbyuser);
  } catch (e) {
    console.log(e.message);
  }
});

//GET all public clubs
router.get("/public", async (req, res) => {
  try {
    const publicClubs = await Club.findAll({ where: { private: false } });
    res.send(publicClubs);
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
router.patch("/:id", auth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const {
      name,
      description,
      pictureUrl,
      backgroundcolor,
      textcolor,
      private,
    } = req.body;
    const club = await Club.findByPk(id);
    if (!club) {
      res.status(404).send(`No clubs with that id ${id}`);
      return;
    } else if (club.ownerId !== userId) {
      res.status(404).send(`You are not the owner of this club to edit it`);
      return;
    }
    const updatedClub = await club.update({
      name: name,
      description: description,
      pictureUrl: pictureUrl,
      backgroundcolor: backgroundcolor,
      textcolor: textcolor,
      private: private,
    });

    res.send(updatedClub);
  } catch (error) {
    console.log(error.message);
  }
});

//POST new club
router.post("/", auth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      name,
      description,
      pictureUrl,
      backgroundcolor,
      textcolor,
      private,
    } = req.body;

    const club = await Club.findOne({ where: { name: name } });
    if (club) {
      res.status(400).send("Club with this name already exist");
      return;
    }
    const newClub = await Club.create({
      name: name,
      description: description,
      pictureUrl: pictureUrl,
      backgroundcolor: backgroundcolor,
      textcolor: textcolor,
      private: private,
      ownerId: userId,
    });
    const newUserClub = await UserClub.create({
      userId: userId,
      clubId: newClub.id,
    });
    res.send(newUserClub);
  } catch (error) {
    console.log(error.message);
  }
});

//DELETE club
router.delete("/:id", auth, async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const clubToDelete = await Club.findByPk(id);
    if (!clubToDelete) {
      res.status(404).send(`No clubs with that id ${id}`);
      return;
    } else if (clubToDelete.ownerId !== userId) {
      res.status(404).send(`You are not the owner of this club to delete it`);
      return;
    }
    const deletedClub = clubToDelete.destroy({ where: { id: id } });
    res.send({ club: deletedClub, message: "club removed" });
  } catch (error) {
    console.log(error.message);
  }
});

//DELETE user from club
router.delete("/members/:id/", auth, async (req, res, next) => {
  const ownerId = req.user.id;
  const { memberId } = req.body;
  const { id } = req.params;
  try {
    const club = await Club.findByPk(id);
    if (!club) {
      res.status(404).send(`No clubs with that id ${id}`);
      return;
    } else if (club.ownerId !== ownerId) {
      res
        .status(404)
        .send(`You are not the owner of this club to delete a member`);
      return;
    }
    const memberToDelete = await UserClub.findOne({
      where: { userId: memberId, clubId: club.id },
    });
    const memberDeleted = memberToDelete.destroy({
      where: { userId: memberId },
    });
    res.send({ member: memberDeleted, message: "member removed" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
