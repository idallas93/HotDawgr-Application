$(document).ready(() => {
  // DEPENDENCIES
  const gender = ["male", "female", "non-binary"];
  const reason = [
    "Playdate",
    "Breeding",
    "Make new friends",
    "Meet new dogs",
    "Non-specific"
  ];

  // Play Date
  //             <input type="radio" name="typeDate" value="1" /> Breeding
  //             <input type="radio" name="typeDate" value="2" /> Make new friends
  //             <input type="radio" name="typeDate" value="3" /> Meet other dog
  //             owners <input type="radio" name="typeDate" value="4" /> Other

  $("#yes").click(event => {
    event.preventDefault();
    console.log("woof");
    renderNew();
  });

  $("#nope").click(event => {
    event.preventDefault();
    console.log("ruff");
    renderNew();
  });

  // async function randomDog() {
  //   const newData = await $.get("/api/dogs", (data) => {});
  //   console.log("newdata", newData);
  //   const id = Math.floor(Math.random() * (newData.length - 1));
  //   console.log("id", id);
  //   return id;
  // }

  async function renderNew() {
    let id;
    let currentDog;
    const currentId = parseInt(localStorage.getItem("currentID"));
    const query = "/api/userInfo/" + currentId;
    const myHuman = await $.get(query, () => {
      return;
    });
    $("#userName").text(myHuman.name);
    await $.get("/api/dogs/", data => {
      id = Math.floor(Math.random() * (data.length - 1));
      const newData = data.filter(row => {
        return row.UserId !== parseInt(localStorage.getItem("currentID"));
      });
      currentDog = newData[id];
      const dogInfo =
        "Doggo name: " +
        currentDog.dogName +
        " Age: " +
        currentDog.age +
        " Gender: " +
        gender[currentDog.gender];
      $("#asn").text(dogInfo);
      const dogText = "Bio:" + currentDog.dogBio;
      $("#bio").text(dogText);
      const looking = "Is looking for: " + reason[currentDog.reason];
      $("#typeDate").text(looking);
    });

    $.get("/api/userInfo/", data => {
      console.log(data);
      const currentHuman = data[id];
      console.log("index", localStorage.getItem("currentID"));
      console.log(currentHuman);
      const humanInfo =
        "Owner name: " +
        currentHuman.name +
        " Age: " +
        currentHuman.age +
        " Gender: " +
        gender[currentHuman.gender];
      $("#asnHuman").text(humanInfo);
      const humanText = "Bio:" + currentHuman.humanBio;
      $("#humanBio").text(humanText);
      const locate = "Location: " + currentHuman.city;
      $("#location").text(locate);
    });
  }

  renderNew();
});
