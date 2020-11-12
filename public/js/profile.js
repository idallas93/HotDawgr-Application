/* eslint-disable no-unused-vars */
$(document).ready(() => {
  // function(){
  //         $("#save").on('click', '.btn', function (event) {
  //             event.preventDefault();
  //             $(this).prev('fieldset').prop('disabled');
  //             $("#save").css("display", "hide")
  //         });
  //         });
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
});
