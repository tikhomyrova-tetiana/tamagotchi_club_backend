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
router.post("/submitTamaForm", auth, async (request, response, next) => {
  try {
    console.log(request.body);
    const { name, age, deaths, version, generation, evolutionId } =
      request.body;

    const newForm = await Tamagotchi.create({
      name: name,
      age: age,
      deaths: deaths,
      version: version,
      generation: generation,
      imageUrl: imageUrl,
      evolutionId: evolutionId,
    });
    response.status(201).send(newForm);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//PATCH tamagotchi info
router.patch("/edit", auth, async (req, res) => {
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

module.exports = router;
