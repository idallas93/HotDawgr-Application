// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
// Global ID variable to keep track of who's logged in

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a confirmation if password matches email
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/user", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        res.json(user);
        // res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Update user
  app.put("/api/user/:id", (req, res) => {
    db.User.update(
      {
        email: req.body.email,
        password: req.body.password
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(db => {
      res.json(db);
    });
  });

  // Update dog
  app.put("/api/dogs/:id", (req, res) => {
    db.Dog.update(
      {
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
      },
      {
        where: {
          UserId: req.params.id
        }
      }
    ).then(db => {
      res.json(db);
    });
  });

  app.put("/api/userInfo/:id", (req, res) => {
    db.UserInfo.update(
      {
        gender: req.body.gender,
        city: req.body.city,
        name: req.body.name,
        age: req.body.age,
        humanBio: req.body.humanBio,
        UserId: req.body.UserId
      },
      {
        where: {
          UserId: req.params.id
        }
      }
    ).then(db => {
      res.json(db);
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
    db.Dog.findAll({}).then(dbDog => {
      res.json(dbDog);
    });
  });

  // get route for retrieving a single dog
  app.get("/api/dogs/:id", (req, res) => {
    db.Dog.findOne({
      where: {
        UserId: req.params.id
      }
    }).then(dbDog => {
      res.json(dbDog);
    });
  });

  // get route for retrieving a single user
  app.get("/api/user/:id", (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(db => {
      res.json(db);
    });
  });

  // get route for retrieving a single dog
  app.get("/api/userInfo/:id", (req, res) => {
    db.UserInfo.findOne({
      where: {
        UserId: req.params.id
      }
    }).then(dbHuman => {
      res.json(dbHuman);
    });
  });
  // get route for retrieving userInfo
  app.get("/api/userInfo/", (req, res) => {
    db.UserInfo.findAll({}).then(dbHuman => {
      res.json(dbHuman);
    });
  });
  // post route for saving a new dog
  app.post("/api/dogs", (req, res) => {
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
