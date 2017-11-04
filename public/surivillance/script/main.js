function getgeolocation() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      let posnObj = {};
      let crd = pos.coords;
      posnObj.x = crd.latitude;
      posnObj.y = crd.longitude;
      posnObj.accuracy = crd.accuracy;
       getDistrictCrimeData(posnObj,'/seriousCrime',updateDOM);
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

document.onload = getgeolocation();

navigator.geolocation.watchPosition(
  (pos) => {
    let posnObj = {};
    let crd = pos.coords;
    posnObj.x = crd.latitude;
    posnObj.y = crd.longitude;
    posnObj.accuracy = crd.accuracy;
     getDistrictCrimeData(posnObj,'/seriousCrime',updateDOM);
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

function getDistrictCrimeData(posnObj,aurl,updatefunc) {
  let requestObj = new XMLHttpRequest();
  let method     = "POST";
  let url        = aurl;
  requestObj.open("POST", url, true);
  requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  requestObj.onreadystatechange = () => {
     if (requestObj.readyState == XMLHttpRequest.DONE && requestObj.status == 200)  {
       let parsedResponse = JSON.parse(requestObj.responseText);
        updatefunc(parsedResponse);
     }
  };
  requestObj.send(`lat=${posnObj.x}&lon=${posnObj.y}`);
}

// updateDOM: object -> true
// sample input
// {
//     "States/UTs": "Bihar",
//     "District": "Patna",
//     "Murder": "317",
//     "Attempt to commit Murder": "26",
//     "Culpable Homicide not amounting to Murder": "5",
//     "Attempt to commit Culpable Homicide": "0",
//     "Rape": "86",
//     "Kidnapping & Abduction_Total": "752",
//     "Dacoity": "45",
//     "Dacoity with Murder": "0",
//     "Other Dacoity": "45",
//     "Making Preparation and Assembly for committing Dacoity": "0",
//     "Robbery": "177",
//     "Riots_Communal": "0",
//     "HumanTrafficking": "0",
//     "Total Cognizable IPC crimes": "19804"
// }
function updateDOM(anObj) {
  let mainDivison = document.getElementById("mainbox");
  let propertyArray = Object.keys(anObj);
  let len           = propertyArray.length;
  let statement;
  let sum=0;
  let result;
  let place = `${anObj[propertyArray[1]]}, ${anObj[propertyArray[0]]}`;
  console.log(place);
  for (var i=2;i<(len-1);i++) {
    sum = sum + Number(anObj[propertyArray[i]]);
  }
  result = (sum > 100);
  if (sum)  {
    statement = `You are travelling in ${place}.This is high crime zone, Avoid travelling at night and deserted area!`;
  } else {
    statement = `You are travelling in ${place}.Crime rate of this place is fairly low, but be careful!`;
  }
  let insideHTML    = `
      <div class="row">
        <h1>You are in survillance mode</h1>
      </div>
      <div class="row">
        <h2>${statement}</h2>
      </div>
  `;

  let k;
  let j;
  let len2 = propertyArray.length;
  let propertyName;
  for(k=3;k<len2;k++)  {
    j = k - 2;
    propertyName = propertyArray[k];
    insideHTML = insideHTML + `
      <div class="row">
        <div class="four columns">${j}</div>
        <div class="four columns">${propertyName}</div>
        <div class="four columns">${anObj[propertyName]}</div>
      </div>
    `;
  }
  mainDivison.innerHTML = insideHTML;
  var msg = new SpeechSynthesisUtterance(statement);
  window.speechSynthesis.speak(msg);
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Total number of serious crime in your area is ${sum}.`));
}
