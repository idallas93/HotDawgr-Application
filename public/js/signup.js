$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // Getting references to Dog Inputs
  const dogSignupForm = $("form.signup2");
  const dogBreed = $("#dogType-input");
  const dogGender = $("input[name='gender']:checked");
  const dogNeutered = $("input[name='dogFix']:checked");
  const dogName = $("#dogName-input");
  const dogAge = $("#dogAge-input");
  const dogColor = $("#dogFur-input");
  const lookingFor = $("input[name='typeDate']:checked");
  const dogBio = $("#dogBio");

  // Getting references to human info
  const humanSignupForm = $("form.signup3");
  const humanGender = $("input[name='genderHuman']:checked");
  const humanCity = $("#cityLocation-input");
  const humanName = $("#humanName-input");
  const humanAge = $("#humanAge-input");
  const humanBio = $("#humanBio-input");

  // Objects to send to tables
  let userData = {};
  let dogData = {};
  let humanData = {};

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // return if any fields are empty
    if (!userData.email || !userData.password) {
      return;
    }

    emailInput.val("");
    passwordInput.val("");
  });

  dogSignupForm.on("submit", event => {
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
    }

    // return if any string fields are empty
    if (!dogData.breed || !dogData.dogName || !dogData.color || !dogData.dogBio) {
      return;
    }

  })

  humanSignupForm.on("submit", event => {
    event.preventDefault();
    humanData = {
      gender: humanGender.val(),
      city: humanCity.val().trim(),
      name: humanName.val().trim(),
      age: humanAge.val(),
      humanBio: humanBio.val().trim()
    }

    // return if any string fields are empty
    if (!humanData.city || !humanData.name || !humanData.humanBio) {
      return;
    }

    // Send info to User, Dog, and userInfo
    signUpUser(userData.email, userData.password);
    signUpDog(dogData);
    signUpHuman(dogData);
  })

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function signUpDog(dog) {
    // TODO: Define function
  }

  function signUpHuman(human) {
    // TODO: Define function
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  // AGE LISTING
  for (let i = 18; i < 41; i++) {
    if (i === 40) {
      const option = $("<option></option>").text("40+").val(i)
      $('#humanAge').append(option)
    }
    else {
      const option = $("<option></option>").text(i).val(i)
      $('#humanAge').append(option)
      console.log("running")
      console.log(option.val())
    }
  }

  for (let i = 1; i < 21; i++) {
    if (i === 20) {
      const option = $("<option></option>").text("20+").val(i)
      $('#dogAge').append(option)
    }
    else {
      const option = $("<option></option>").text(i).val(i)
      $('#dogAge').append(option)
      console.log("running")
      console.log(option.val())
    }
  }

  $("#button-one").click(function (event) {
    event.preventDefault();
    console.log("is this working");
    $(".signup").hide();
    $(".signup2").show();
    if (!userData.email || !userData.password) {
      return;
    }
  })

  $("#button-two-next").click(function (event) {
    event.preventDefault();
    console.log("is this working");
    $(".signup2").hide();
    $(".signup3").show();
    if (!dogData.breed || !dogData.dogName || !dogData.color || !dogData.dogBio) {
      return;
    }
  })

  $("#button-two-back").click(function (event) {
    event.preventDefault();
    console.log("is this working");
    $(".signup2").hide();
    $(".signup").show();
  })
  $("#button-three-back").click(function (event) {
    event.preventDefault();
    console.log("is this working");
    $(".signup3").hide();
    $(".signup2").show();
  })
});

