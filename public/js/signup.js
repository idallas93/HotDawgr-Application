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

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // return if any fields are empty
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  dogSignupForm.on("submit", event => {
    event.preventDefault();
    const dogData = {
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

    signUpDog(dogData);
  })

  humanSignupForm.on("submit", event => {
    event.preventDefault();
    const humanData = {
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

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
