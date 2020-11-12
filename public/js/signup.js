/* eslint-disable no-unused-vars */
$(document).ready(() => {
  // Getting references to our form and input
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const passwordConfirm = $("#passwordConfirm-input");

  // Getting references to Dog Inputs
  const dogSignupForm = $("form.signup2");
  const dogBreed = $("#dogType-input");
  const dogGender = $("input[name='gender']:checked");
  const dogNeutered = $("input[name='dogFix']:checked");
  const dogName = $("#dogName-input");
  const dogAge = $("#dogAge");
  const dogColor = $("#dogFur-input");
  const lookingFor = $("input[name='typeDate']:checked");
  const dogBio = $("#dogBio");

  // Getting references to human info
  const humanSignupForm = $("form.signup3");
  const humanGender = $("input[name='genderHuman']:checked");
  const humanCity = $("#cityLocation-input");
  const humanName = $("#humanName-input");
  const humanAge = $("#humanAge");
  const humanBio = $("#humanBio");

  // Objects to send to tables
  let userData = {};
  let dogData = {};
  let humanData = {};

  humanSignupForm.on("submit", event => {
    event.preventDefault();
    humanData = {
      gender: humanGender.val(),
      city: humanCity.val().trim(),
      name: humanName.val().trim(),
      age: humanAge.val(),
      humanBio: humanBio.val().trim()
    };

    // return if any string fields are empty
    if (!humanData.city || !humanData.name || !humanData.humanBio) {
      return;
    }

    // console.log(userData);
    // console.log(dogData);
    // console.log(humanData);

    // Send info to User, Dog, and userInfo
    signUpUser(userData.email, userData.password, dogData, humanData);
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(emailData, passwordData, dog, human) {
    console.log(dog);
    console.log(human);
    $.post("/api/user", {
      email: emailData,
      password: passwordData
    })
      .then(user => {
        console.log("user created:", user);
        // window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
        $.post("/api/dogs", {
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
          $.post("/api/userInfo", {
            gender: human.gender,
            city: human.city,
            name: human.name,
            age: human.age,
            humanBio: human.humanBio,
            UserId: user.id
          });
          window.location.replace("/match");
          // If there's an error, handle it by throwing up a bootstrap alert
        });
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  // AGE LISTING
  for (let i = 18; i < 41; i++) {
    if (i === 40) {
      const option = $("<option></option>")
        .text("40+")
        .val(i);
      $("#humanAge").append(option);
    } else {
      const option = $("<option></option>")
        .text(i)
        .val(i);
      $("#humanAge").append(option);
    }
  }
  for (let i = 1; i < 21; i++) {
    if (i === 20) {
      const option = $("<option></option>")
        .text("20+")
        .val(i);
      $("#dogAge").append(option);
    } else {
      const option = $("<option></option>")
        .text(i)
        .val(i);
      $("#dogAge").append(option);
    }
  }

  // Buttons navigating forms
  $("#button-one").click(event => {
    event.preventDefault();
    // return if any fields are empty or if password isn't confirmed properly
    if (
      !emailInput.val() ||
      !passwordInput.val() ||
      passwordInput.val() !== passwordConfirm.val()
    ) {
      return;
    }

    event.preventDefault();
    userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    $(".signup1").hide();
    $(".signup2").show();
  });

  $("#button-two-next").click(event => {
    event.preventDefault();

    dogData = {
      breed: dogBreed.val().trim(),
      gender: dogGender.val(),
      fixed: dogNeutered.val(),
      dogName: dogName.val().trim(),
      age: dogAge.val(),
      color: dogColor.val().trim(),
      reason: lookingFor.val(),
      dogBio: dogBio.val().trim()
    };

    // return if any string fields are empty
    if (!dogBreed.val() || !dogName.val() || !dogColor.val() || !dogBio.val()) {
      return;
    }

    $(".signup2").hide();
    $(".signup3").show();
  });

  $("#button-two-back").click(event => {
    event.preventDefault();
    $(".signup2").hide();
    $(".signup1").show();
  });
  $("#button-three-back").click(event => {
    event.preventDefault();
    $(".signup3").hide();
    $(".signup2").show();
  });
});
