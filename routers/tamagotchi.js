const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const auth = require("../auth/middleware");
const User = require("../models/").user;
const Club = require("../models/").club;
const Evolution = require("../models/").evolution;
const Tamagotchi = require("../models/").tamagotchi;
const UserClub = require("../models/").userClub;
const router = new Router();

//GET evolutions
router.get("/evolution", async (req, res, next) => {
  try {
    const evolutions = await Evolution.findAll();
    res.send(evolutions);
  } catch (e) {
    console.log(e);
  }
});

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

//GET all tamagotchis from user
router.get("/mine", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const mine = await Tamagotchi.findAll({
      where: { userId: userId },
      include: [{ model: Evolution }],
    });
    res.send(mine);
  } catch (e) {
    console.log(e.message);
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
router.post("/", auth, async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, age, deaths, version, generation, imageUrl, evolutionId } =
      req.body;
    const userId = req.user.id;

    const newTamaForm = await Tamagotchi.create({
      name: name,
      age: age,
      deaths: deaths,
      version: version,
      generation: generation,
      imageUrl: imageUrl,
      userId: userId,
      evolutionId: evolutionId,
    });
    res.status(201).send(newTamaForm);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//PATCH tamagotchi info
router.patch("/editTamaForm", auth, async (req, res) => {
  const { name, age, deaths, version, generation, evolutionId } = req.body;
  try {
    const updatedTama = await Tamagotchi.update({
      name,
      age: parseInt(age),
      deaths,
      version,
      generation,
      imageUrl,
      evolutionId: parseInt(evolutionId),
    });
    res.status(200).send({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send("invalid ID");
  }
});

//DELETE tamagotchi
// http POST :4000/auth/login email=... password=... --> token
// http DELETE :4000/tamagotchi/id Authorization:"Bearer ...token"
router.delete("/:id", auth, async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const tamaToDelete = await Tamagotchi.findByPk(id);
    if (!tamaToDelete) {
      res.status(404).send(`No tamagochis with that id ${id}`);
      return;
    } else if (tamaToDelete.userId !== userId) {
      res.status(404).send(`You are not the owner of this tamagotchi`);
      return;
    }
    const deletedTamagotchi = tamaToDelete.destroy({ where: { id: id } });
    res.send({ tamagotchi: deletedTamagotchi, message: "tamagotchi removed" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
