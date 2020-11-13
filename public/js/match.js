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

  // Logging out
  $("#logout").click(() => {
    localStorage.setItem("currentID", "");
    window.location.replace("/login");
  });

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
      const newData = data.filter(row => {
        return row.UserId !== parseInt(localStorage.getItem("currentID"));
      });
      id = Math.floor(Math.random() * newData.length);
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
      const humanData = data.filter(row => {
        return row.UserId !== parseInt(localStorage.getItem("currentID"));
      });
      const currentHuman = humanData[id];
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
