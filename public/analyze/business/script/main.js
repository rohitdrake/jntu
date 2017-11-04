// getgeolocation: sting -> object
// calls getStateCrimeData using its posnObj and returns
// ouput of getStateCrimeData
function getgeolocation(urlserver) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      let posnObj = {};
      let crd = pos.coords;
      posnObj.lat = crd.latitude;
      posnObj.lon = crd.longitude;
      posnObj.accuracy = crd.accuracy;
     getStateCrimeData(posnObj, urlserver);
    },
    (err) => {
      console.error(err);
    }
    ,
    {
      enableHighAccuracy: true,
      timeout: 5000
    }
  )
}

// getStateCrimeData: object string -> object
// returns an array containing crime data of state described
// by posnObj by sending post request to url
// Example of output data:-
// {
//     "States/UTs": "Bihar",
//     "District": "Patna",
//     "Year": "2014",
//     "Rape": "86",
//     "Attempt to commit Rape": "28",
//     "Kidnapping & Abduction of Women to compel her for marriage": "519",
//     "Acid attack": "0",
//     "Attempt to Acid Attack": "0",
//     "Dowry Deaths": "83",
//     "Assault on Women with intent to outrage her Modesty": "0",
//     "Sexual Harassment": "0",
//     "Assault or use of criminal force to women with intent to Disrobe": "0",
//     "Voyeurism": "0",
//     "Stalking": "0",
//     "Other Assault on Women": "0",
//     "Insult to the Modesty of Women": "60",
//     "Cruelty by Husband or his Relatives": "535",
//     "Importation of Girls from Foreign Country": "0"
// }
function getStateCrimeData(posnObj, urlserver) {
  let requestObj = new XMLHttpRequest();
  let method     = "POST";
  requestObj.open("POST", urlserver, true);
  requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  requestObj.onreadystatechange = () => {
     if (requestObj.readyState == XMLHttpRequest.DONE && requestObj.status == 200)  {
       let parsedResponse = JSON.parse(requestObj.responseText);
        updateDOM(parsedResponse);
     }
  };
  requestObj.send(`lat=${posnObj.lat}&lon=${posnObj.lon}`);
}

function updateDOM(crimeObject)  {
  let propArray = Object.keys(crimeObject); // ["name", "surname"]
  let insideHTML = `
      <div class="row">
        <h1>Crime data of ${crimeObject[propArray[1]]}, ${crimeObject[propArray[0]]} :-</h1>
      </div>
      <div class="row">
        <div class="four columns">Serial NO.</div>
        <div class="four columns">Crime Name</div>
        <div class="four columns">Total Number</div>
      </div>
  `;
  let i;
  let j;
  let len = propArray.length;
  let propertyName;
  for(i=3;i<len;i++)  {
    j = i - 2;
    propertyName = propArray[i];
    insideHTML = insideHTML + `
      <div class="row">
        <div class="four columns">${j}</div>
        <div class="four columns">${propertyName}</div>
        <div class="four columns">${crimeObject[propertyName]}</div>
      </div>
    `;
  }
  document.getElementById("mainbox").innerHTML = insideHTML;
}


document.getElementById("business").onclick = () => getgeolocation('/businessCrime');
