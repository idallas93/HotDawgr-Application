const fetch = require("node-fetch");

// fetch data from dogs API
fetch("https://api.thedogapi.com/v1/images/search?limit=100", {
  headers: {
    "x-api-key": "9b591ab9-d9d1-4d0e-8a37-1223db72bed2"
  }
})
  .then(response => response.json())
  .then(data => console.log(data));

//   iterate through dog array and for each one create an entry into the database/ randomly choose male or female/ randomly choose and age/
<<<<<<< HEAD
=======

// for (i = 0; i <= data.length; i++) {}

app.post("/api/dogs", (req, res) => {
  console.log("dog object", req.body);
  db.Dog.create({
    breed: req.body.breed,
    gender: req.body.gender,
    fixed: req.body.fixed,
    name: req.body.name,
    age: req.body.age,
    color: req.body.color,
    reason: req.body.reason,
    plainText: req.body.plainText
  }).then(dbDog => {
    res.json(dbDog);
  });
});
>>>>>>> 690d9f289a8657e099e0618fe452fcaff5dc1600
