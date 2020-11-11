// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
// Global ID variable to keep track of who's logged in
let loggedInID;

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    loggedInID = req.user.id;
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/user", (req, res) => {
    console.log("here");
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        loggedInID = user.id;
        res.json(user);
        // res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // get route for getting all of the dogs
  app.get("/api/dogs/", (req, res) => {
    console.log(loggedInID);
    db.Dog.findAll({}).then(dbDog => {
      dbDog.currentID = loggedInID;
      res.json(dbDog);
    });
  });
  // get route for returning certain types of dogs
  app.get("/api/dogs/breed/:breed", (req, res) => {
    db.Dog.findAll({
      where: {
        category: req.params.dogType
      }
    }).then(dbDog => {
      res.json(dbDog);
    });
  });
  // get route for retrieving a single dog
  app.get("/api/dogs/:id", (req, res) => {
    db.Dog.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbDog => {
      res.json(dbDog);
    });
  });
  // post route for saving a new dog
  app.post("/api/dogs", (req, res) => {
    console.log("dog object", req.body);
    db.Dog.create({
      breed: req.body.breed,
      gender: req.body.gender,
      fixed: req.body.fixed,
      dogName: req.body.dogName,
      age: req.body.age,
      color: req.body.color,
      reason: req.body.reason,
      photo: "",
      dogBio: req.body.dogBio,
      UserId: req.body.UserId
    }).then(dbDog => {
      res.json(dbDog);
    });
  });
  // userinfo
  app.post("/api/userInfo", (req, res) => {
    console.log("user info", req.body);
    db.UserInfo.create({
      gender: req.body.gender,
      city: req.body.city,
      name: req.body.name,
      age: req.body.age,
      humanBio: req.body.humanBio,
      UserId: req.body.UserId
    }).then(dbUserInfo => {
      res.json(dbUserInfo);
    });
  });
  // delete route for deleting dogs
  app.delete("/api/dogs/:id", (req, res) => {
    db.Dog.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbPost => {
      res.json(dbPost);
    });
  });
  // PUT route for updating dogs
  app.put("/api/dogs", (req, res) => {
    db.Dog.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbDog => {
      res.json(dbDog);
    });
  });
};
