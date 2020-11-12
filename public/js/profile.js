/* eslint-disable no-unused-vars */
$(document).ready(() => {
  async function renderCurrent() {
    const id = parseInt(localStorage.getItem("currentID"));
    const query = "/api/dogs/" + id;
    const query2 = "/api/userInfo/" + id;
    const check = function(selector, key) {
      for (i = 0; i < selector.length; i++) {
        if (parseInt(selector[i].value) === myDog[key]) {
          selector[i].checked = true;
        }
      }
    };
    const myDog = await $.get(query, () => {
      return;
    });

    $("#dogType-input").text(myDog.breed);
    // fixed
    check($(".dogGender"), "gender");
    check($(".dogFix"), "fixed");
    check($(".typeDate"), "reason");
    $("#dogName-input").val(myDog.dogName);
    $("#dogAge-input").val(myDog.age);
    $("#dogFur-input").val(myDog.color);
    // is looking for
    $("#dogBio").text(myDog.dogBio);
    const myHuman = await $.get(query2, () => {
      return;
    });
    console.log(myHuman);
    $("#cityLocation-input").val(myHuman.city);
    $("#humanName-input").val(myHuman.name);
    $("#humanAge-input").val(myHuman.age);
    $("#humanBio").text(myHuman.humanBio);
  }
  renderCurrent();
  //   auto select dog gender
  $("#edits").click(event => {
    event.preventDefault();
    $("#field").prop("disabled", false);
    $("#save").show();
  });

  // submit updated info
  $(".update-form").submit(event => {
    event.preventDefault();
    id = localStorage.getItem("currentID");
    // Update database info
    $.put("/api/user" + id, {
      email: emailData,
      password: passwordData
    }).then(user => {
      console.log("user updated:", user);
      // window.location.replace("/members");
      // If there's an error, handle it by throwing up a bootstrap alert
      $.put("/api/dogs" + id, {
        breed: dog.breed,
        gender: dog.gender,
        fixed: dog.fixed,
        dogName: dog.dogName,
        age: dog.age,
        color: dog.color,
        reason: dog.reason,
        dogBio: dog.dogBio,
        UserId: user.id
      }).then(() => {
        $.put("/api/userInfo" + id, {
          gender: human.gender,
          city: human.city,
          name: human.name,
          age: human.age,
          humanBio: human.humanBio,
          UserId: user.id
        });
      });
    });
  });
});
