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

  function randomDog() {
    let id;
    $.get("/api/dogs", data => {
      id = Math.floor(Math.random() * (data.length - 1));
    });
    return id;
  }

  function renderNew() {
    const id = randomDog();
    $.get("/api/dogs/", data => {
      const newData = data.filter(row => {
        console.log(row.UserId);
        return row.UserId !== parseInt(localStorage.getItem("currentID"));
      });
      // const currentDog = newData[id];
      const currentDog = newData[0];
      console.log(newData[0]);
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

    $.get("/api/userInfo/", currentDog => {
      const humanInfo =
        "Owner name: " +
        currentDog.name +
        " Age: " +
        currentDog.age +
        " Gender: " +
        currentDog.gender;
      $("#asnHuman").text(humanInfo);
      const humanText = "Bio:" + currentDog.humanBio;
      $("#humanBio").text(humanText);
      const locate = "Location: " + currentDog.city;
      $("#location").text(locate);
    });
  }
});
