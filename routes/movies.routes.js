const express = require("express");
const router = express();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// Iteration 6
// router.get("/create", (req, res) => {
//   Celebrity.find()
//     .then((result) => {
//       res.render("movies/new-movie", { celebrities: result });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// SOLUTION 2
router.get("/create", async (req, res, next) => {
  try {
    const celebsList = await Celebrity.find();
    res.render("movies/new-movie.hbs", { celebrities: celebsList });
  } catch (error) {
    console.log(error);
  }
});

// router.post("/create", (req, res) => {
//   const { title, genre, plot, cast } = req.body;

//   console.log(title, genre, plot, cast);

//   Movie.create({
//     title,
//     genre,
//     plot,
//     cast: cast,
//   })
//     .then(() => {
//       res.redirect("/movies");
//     })
//     .catch(() => {
//       res.status(500).json({
//         errorMessage: "Error occured while trying to creating a new movie",
//       });
//     });
// });

// SOLUTION 2
router.post("/create", async (req, res) => {
  try {
    const { title, genre, plot, cast } = req.body;
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    res.render("movies/new-movie");
  }
});

// Iteration 7
// router.get("/", (req, res) => {
//   Movie.find()
//     .then((dataFromDataBase) => {
//       console.log(dataFromDataBase);
//       res.render("movies/movies.hbs", { movies: dataFromDataBase });
//     })
//     .catch(() => {
//       console.log("error occured while fetcing movies !");
//     });
// });

// SOLUTION 2
router.get("/", async (req, res, next) => {
  try {
    const dataFromDataBase = await Movie.find();
    res.render("movies/movies.hbs", { movies: dataFromDataBase });
  } catch (error) {
    console.log(err);
  }
});

// Iteration 8
// router.get("/:movieId", (req, res, next) => {
//   const movieId = req.params.movieId;

//   Movie.findById(movieId)
//     .populate("cast")
//     .then((foundMovie) => {
//       console.log(`foundMovie`, foundMovie);

//       res.render("movies/movie-details", { foundMovie });
//     });
// });

// SOLUTION 2
router.get("/:movieId", async (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findById(movieId)
    .populate("cast")
    .then((foundMovie) => {
      console.log(`foundMovie`, foundMovie);

      res.render("movies/movie-details", { foundMovie });
    });
});

// Iteration 9
router.post("/:movieId/delete", (req, res) => {
  console.log(req.params.movieId);

  Movie.findByIdAndDelete(req.params.movieId)
    .then(() => {
      res.redirect("/movies");
      // res.status(200).json({ message: "Movie deleted!" });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Iteration 10
router.get("/:id/edit", (req, res) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate("cast")
    .then((movie) => {
      Celebrity.find()
        .then((celebrities) => {
          res.render("movies/movie-edit", { movie, celebrities });
        })
        .catch((celebritiesError) => {
          console.error(celebritiesError);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((movieError) => {
      console.error(movieError);
      res.status(500).send("Internal Server Error");
    });
});

router.post("/:id/edit", (req, res) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
    .populate("cast")
    .then(() => {
      res.redirect(`/movies/${movieId}`);
    })
    .catch((updateError) => {
      console.error(updateError);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
