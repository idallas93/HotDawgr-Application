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
    $.get("/api/dogs", data => {
      console.log(data)
      // data.filter()
      return Math.floor(Math.random() * data.length);
    });
  }
  function renderNew() {
    let id = randomDog();
    }
    $.get("/api/dogs/", data => {
      const currentDog = data[id];
      const dogInfo =
        "Doggo name: " +
        currentDog.name +
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
