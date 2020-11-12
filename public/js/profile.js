/* eslint-disable no-unused-vars */
$(document).ready(() => {
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
    password.val(myUser.password); //UNHASHING ???

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
      console.log("user updated:", user);
      // window.location.replace("/members");
      // If there's an error, handle it by throwing up a bootstrap alert
      $.ajax({
        method: "PUT",
        url: "/api/dogs" + id,
        data: {
          breed: dogType.val(),
          gender: dogGender.val(),
          fixed: dogFixed.val(),
          dogName: dog.dogName,
          age: dog.age,
          color: dog.color,
          reason: dog.reason,
          dogBio: dog.dogBio,
          UserId: user.id
        }
      }).then(() => {
        $.ajax({
          method: "PUT",
          url: "/api/userInfo" + id,
          data: {
            gender: human.gender,
            city: human.city,
            name: human.name,
            age: human.age,
            humanBio: human.humanBio,
            UserId: user.id
          }
        });
      });
    });
  });
});
