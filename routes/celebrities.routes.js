const express = require("express");

const router = express();

const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res) => {
  Celebrity.find()
    .then((result) => {
      console.log(result);
      res.render("celebrities/celebrities", { celebrities: result });
    })
    .catch(() => {
      res
        .json(404)
        .send({ errorMessage: "Error occured while fetching Celebrities!" });
    });
});

// /celebrities/create	GET	Show a form to create a celebrity
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

// /celebrities/create	POST	Send the data from the form to this route to create the celebrity and save it to the database
router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  console.log(name, occupation, catchPhrase);

  if (!name || !occupation || !catchPhrase) {
    res.redirect("/celebrities/create");
  } else {
    Celebrity.create({
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase,
    })
      .then((result) => {
        console.log(result);
        res.status(200).json({ message: "You created the new celebrity!" });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

module.exports = router;