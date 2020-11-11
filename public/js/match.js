$(document).ready(() => {
  $("#yes").click((event) => {
    event.preventDefault();
    console.log("woof");
    renderNew();
  });

  $("#nope").click((event) => {
    event.preventDefault();
    console.log("ruff");
    renderNew();
  });
  function randomDog() {
    $.get("/api/dogs", (data) => {
      return Math.floor(Math.random() * data.length);
    });
  }
  function renderNew() {
    const id = randomDog();
    // eslint-disable-next-line no-empty-function
    $.get("/api/dogs/" + id, (data) => {
      const dogInfo =
        "Doggo name: " +
        data.name +
        " Age: " +
        data.age +
        " Gender: " +
        data.gender;
      $("#asn").text(dogInfo);
      const dogText = "Bio:" + <br /> + data.dogBio;
      $("#dogBio").text(dogText);
      const looking = "Is looking for: " + data.reason;
      $("#typeDate").text(looking);
    });
    $.get("/api/userInfo/" + id, (data) => {
      const humanInfo =
        "Owner name: " +
        data.name +
        " Age: " +
        data.age +
        " Gender: " +
        data.gender;
      $("#asnHuman").text(humanInfo);
      const humanText = "Bio:" + <br /> + data.humanBio;
      $("#humanBio").text(humanText);
      const locate = "Location: " + data.city;
      $("#location").text(locate);
    });
  }
});
