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
  async function renderNew() {
    let id;
    let currentDog;
    const currentId = parseInt(localStorage.getItem("currentID"));
    const query = "/api/userInfo/" + currentId;
    const myHuman = await $.get(query, () => {
      return;
    });
    await $.get("/api/dogs", data => {
      id = Math.floor(Math.random() * (data.length - 1));
      const newData = data.filter(row => {
        return row.UserId !== parseInt(localStorage.getItem("currentID"));
      });

      currentDog = newData[id];
      console.log(currentDog);
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
      const currentHuman = data[id];
      // console.log("index", localStorage.getItem("currentID"));
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
    $("#userName").text(myHuman.name);
  }
  renderNew();
});
