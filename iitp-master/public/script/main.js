// get_location_and_fill_form: event-object -> boolean
// when a button is clicked, this function uses geolocation
// api to get longitude and latitude of users divce, After
// that it fills the form in DOM
// Dependencies:-
// 1.) navigator.geolocation.getCurrentPosition(success[, error[, options]])
// 2.) fill_dom_form
function getLocationAndFillForm(anEo) {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  navigator.geolocation.getCurrentPosition(
    (pos) => {
        var crd = pos.coords;
        console.log(crd);
        var posnObj = {
          latitude: crd.latitude,
          longitude: crd.longitude,
          accuracy: crd.accuracy
        }
        fill_dom_form(posnObj);
        return true
    },
    (err) => console.warn(`ERROR(${err.code}): ${err.message}`),
    options);
}

// fill_dom_form: posnObj -> boolean
// access form object and fills appropriate input field
// TEMPLATE:-
// function fill_dom_form(an-Obj) {
//   ...(an-Obj.latitude)...
//   ...(an-Obj.longitude)...
//   ...(an-Obj.accuracy)...
//}
// Dependencies:-
// document.getElementById("myForm");
function fill_dom_form(anObj)  {
var form_element =  document.getElementById("myform");
form_element.elements["persons_lat"].value = (anObj.latitude);
form_element.elements["persons_lon"].value = (anObj.longitude);
form_element.elements["location_accuracy"].value = (anObj.accuracy);
document.getElementById("post_data_button").click();
return true;
}

var panic_button = document.getElementById("panic_button");
panic_button.onclick  = getLocationAndFillForm;
panic_button.click();
