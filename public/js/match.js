$(document).ready(() => {
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
    await $.get("/api/dogs/", data => {
      // console.log(data);
      // console.log(data.length);
      id = Math.floor(Math.random() * (data.length - 1));
      const newData = data.filter(row => {
        // console.log(row.UserId);
        return row.UserId !== parseInt(localStorage.getItem("currentID"));
      });
      const currentDog = newData[id];
      const dogInfo =
        "Doggo name: " +
        currentDog.dogName +
        " Age: " +
        currentDog.age +
        " Gender: " +
        currentDog.gender;
      $("#asn").text(dogInfo);
      const dogText = "Bio:" + currentDog.dogBio;
      $("#dogBio").text(dogText);
      const looking = "Is looking for: " + currentDog.reason;
      $("#typeDate").text(looking);
    });

    $.get("/api/userInfo/", data => {
      // console.log(data);
      console.log(data[0].age);
      const currentHuman = data[id];
      console.log(currentHuman);
      const humanInfo =
        "Owner name: " +
        currentHuman.name +
        " Age: " +
        currentHuman.age +
        " Gender: " +
        currentHuman.gender;
      $("#asnHuman").text(humanInfo);
      const humanText = "Bio:" + currentHuman.humanBio;
      $("#humanBio").text(humanText);
      const locate = "Location: " + currentHuman.city;
      $("#location").text(locate);
    });
  }

  renderNew();
});
