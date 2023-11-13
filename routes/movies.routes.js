const express = require("express");

const router = express();

router.get("/", (req, res) => {
  res.render("movies/new-movie");
});

router.post("/", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  console.log(title, genre, plot, cast);
});

module.exports = router;
