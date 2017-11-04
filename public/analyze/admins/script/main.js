// getgeolocation: null -> object
// calls getStateCrimeData using its posnObj and returns
// ouput of getStateCrimeData
function getgeolocation() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      let posnObj = {};
      let crd = pos.coords;
      posnObj.x = crd.latitude;
      posnObj.y = crd.longitude;
      posnObj.accuracy = crd.accuracy;
      return getStateCrimeData(posnObj,"/analyzeState",updateDOM);
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

// getStateCrimeData: object -> array
// returns an array containing crime data of state described
// by posnObj
// Example of output data:-
// [
//     {
//         "name": "Araria",
//         "state_name": "Bihar",
//         "total": "3898"
//     },
//     {
//         "name": "Arwal",
//         "state_name": "Bihar",
//         "total": "991"
//     },.........]
function getStateCrimeData(posnObj,aurl,updatefunc) {
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

// updateDOM: array -> true
// updates dom using data provided getStateCrimeData
function updateDOM(stateArray)  {
  var stateArray = stateArray.sort((a, b) => { return a.total - b.total; });
  let insideHTML = `
    <div class="row">
    <h1>Crime data of ${stateArray[0].state_name} is given below:-<h1>
    </div>
    <div class="row">
    <div class="four columns">Serial No.</div>
    <div class="four columns">District Name</div>
    <div class="four columns">Toal IPC crime</div>
    </div>
  `;
  let len = stateArray.length;
  let i;
  for (i=0; i<len;i++)  {
    insideHTML = insideHTML + `<div class="row district_name" id=${stateArray[i].name}>
    <a href="#">
    <div class="four columns">${i}.</div>
    <div class="four columns">${stateArray[i].name}</div>
    <div class="four columns">${stateArray[i].total}</div>
    </a>
    </div>`;
  }
  document.getElementById("mainbox").innerHTML = insideHTML;
  let row_array = document.getElementsByClassName("district_name");
  let k;
  let len2 = row_array.length;
  for (k=0; k<len2; k++)  {
   appEventList(row_array[k]);
  }
}

// closur problem
function appEventList(anObj)  {
  anObj.onclick = () => {
    console.log(anObj.id);
    getStateCrimeData({x: anObj.id, y: null},'/seriousCrimeforState',updateDOMDis);
  };
}

// showStateCrimedata: eventObject -> true
// retrives data from the server and updates the dom
function showStateCrimedata(anObj)  {
  getgeolocation()
}

function updateDOMDis(crimeObject)  {
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



document.getElementById("state").onclick = showStateCrimedata;
// document.getElementById("district").onclick = showDistrictCrimeData;
