$(document).ready(() => {
  // function(){
  //     $("#edits").on('click', '.btn', function (event) {
  //         event.preventDefault();
  //         $(this).prev('fieldset').removeProp('disabled');
  //         $("#save").css("display", "block")
  //     });
  //     });
  // function(){
  //         $("#save").on('click', '.btn', function (event) {
  //             event.preventDefault();
  //             $(this).prev('fieldset').prop('disabled');
  //             $("#save").css("display", "hide")
  //         });
  //         });
  async function renderCurrent() {
    const id = parseInt(localStorage.getItem("currentID"));
    console.log(id);
    const myDog = await $.get("/api/dogs/:" + id, err => {
      if (err) {
        throw err;
      }
    });
    console.log(myDog);
    $("#dogType-input").text(myDog.breed);
    // fixed
    for (i = 0; i < $(".dogGender").length; i++) {
      if ($(".dogGender")[i].value === myDog.gender) {
        $(".dogGender")[i].checked = true;
      }
    }
    $("#dogName-input").text(myDog.dogName);
    $("#dogAge-input").text(myDog.age);
    $("#dogFur-input").text(myDog.color);
    // is looking for
    $("#dogBio").text(myDog.dogBio);
    await $.get("/api/userInfo/", data => {
      const myHuman = data.filter(row => {
        return row.UserId === parseInt(localStorage.getItem("currentID"));
      });
      $("#cityLocation-input").text(myHuman.city);
      $("#humanName-input").text(myHuman.name);
      $("#humanAge-input").text(myHuman.age);
      $("#humanBio").text(myHuman.humanBio);
    });
  }
  renderCurrent();
  //   auto select dog gender
});
