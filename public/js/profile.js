/* eslint-disable no-unused-vars */
$(document).ready(() => {
  // DEPENDENCIES
  const email = $("#email-input");
  const password = $("#password-input");
  const dogType = $("#dogType-input");
  const dogGender = $(".dogGender");
  const dogFixed = $(".dogFix");
  const reason = $("#typeDate");
  const dogName = $("#dogName-input");
  const dogAge = $("#dogAge-input");
  const dogColor = $("#dogFur-input");
  const dogBio = $("#dogBio");
  const humanGender = $("#humanGender");
  const location = $("#cityLocation-input");
  const humanName = $("#humanName-input");
  const humanAge = $("#humanAge-input");
  const humanBio = $("#humanBio");

  async function renderCurrent() {
    const id = parseInt(localStorage.getItem("currentID"));
    const query1 = "/api/user/" + id;
    const query2 = "/api/dogs/" + id;
    const query3 = "/api/userInfo/" + id;
    const check = function(selector, key) {
      for (i = 0; i < selector.length; i++) {
        if (parseInt(selector[i].value) === myDog[key]) {
          selector[i].checked = true;
        }
      }
    };

    // Grabbing user's information
    const myUser = await $.get(query1, () => {
      return;
    });

    const myDog = await $.get(query2, () => {
      return;
    });

    const myHuman = await $.get(query3, () => {
      return;
    });

    // PUTTING INFO ON PAGE
    // User info
    email.val(myUser.email);
    // password cant be unhashed, we dont populate it

    // Dog info
    dogType.val(myDog.breed);
    // fixed
    check(dogGender, "gender");
    check(dogFixed, "fixed");
    check(reason, "reason");
    dogName.val(myDog.dogName);
    dogAge.val(myDog.age);
    dogColor.val(myDog.color);
    // is looking for
    dogBio.text(myDog.dogBio);

    // Human info
    location.val(myHuman.city);
    humanName.val(myHuman.name);
    humanAge.val(myHuman.age);
    humanBio.text(myHuman.humanBio);
  }
  renderCurrent();
  //   auto select dog gender
  $("#edits").click(event => {
    event.preventDefault();
    $("#field").prop("disabled", false);
    $("#save").show();
  });

  // Logging out
  $("#logout").click(() => {
    localStorage.setItem("currentID", "");
    window.location.replace("/login");
  });

  // submit updated info
  $(".update-form").submit(event => {
    event.preventDefault();
    id = localStorage.getItem("currentID");
    // Update database info
    $.ajax({
      method: "PUT",
      url: "/api/user" + id,
      data: {
        email: email.val(),
        password: password.val()
      }
    }).then(user => {
      // If there's an error, handle it by throwing up a bootstrap alert
      $.ajax({
        method: "PUT",
        url: "/api/dogs" + id,
        data: {
          breed: dogType.val(),
          gender: dogGender.val(),
          fixed: dogFixed.val(),
          dogName: dogName.val(),
          age: dogAge.val(),
          color: dogColor.val(),
          reason: reason.val(),
          dogBio: dogBio.val(),
          UserId: user.id
        }
      }).then(() => {
        $.ajax({
          method: "PUT",
          url: "/api/userInfo/" + id,
          data: {
            gender: humanGender.val(),
            city: location.val(),
            name: humanName.val(),
            age: humanAge.val(),
            humanBio: humanBio.val(),
            UserId: user.id
          }
        });
        $("#field").prop("disabled", true);
        $("#save").hide();
      });
    });
  });
});
