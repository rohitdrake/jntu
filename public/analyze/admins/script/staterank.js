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
      getStateCrimeData(posnObj,"/getStateRank",upDateDOM);
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



// upDateDOM: (arrayof array) -> true
// sampleData:-
// [ ["Assam", 19, 100, 0.19, "red"], ["Bihar", 23, 1000, 0.023, "green"], ["Gujrat", 13, 200, 0.065, "green"]]
function upDateDOM(anArray) {
  let mainBOX = document.getElementById("mainbox");
  anArray = anArray.sort((a, b) => {return (Number(a[3]) - Number(b[3]));});
  let insideHTML = `
    <div class="row">
      <h1>State Ranks are given below:-</h1>
    </div>
    <div class="row">
      <div class ="one columns">
        <p>Rank</p>
      </div>
      <div class ="three columns">
        <p>State Name</p>
      </div>
      <div class ="three columns">
        <p>Total Crime</p>
      </div>
      <div class ="three columns">
        <p>State Population</p>
      </div>
      <div class ="two columns">
       <p>Crime Density</p>
      </div>
    </div>
  `;
  let len = anArray.length;
  let i;
  let rowNumber;//to store rank
  let StateName;//to store state name
  let CrimeNumber;//to store total crime in state
  let StatePop;//to store population of a state
  let CrimeDensity;// to store crime density of a state
  let statusFlag;// to store crime status of a state
  for (i=0;i<len;i++) {
    rowNumber = i+1;
    StateName = anArray[i][0];
    CrimeNumber = anArray[i][1];
    StatePop = anArray[i][2];
    CrimeDensity = anArray[i][3];
    statusFlag = anArray[i][4];
    insideHTML = insideHTML + giveROW(rowNumber,StateName,CrimeNumber,StatePop,CrimeDensity,statusFlag);
  }
  mainBOX.innerHTML = insideHTML;
}

function giveROW(aRowNum, aStateName, CrimeNum, Statepop, crimeDensity,flag) {
  let rowHTML = `
    <div class="row" id="${flag}">
      <div class="one columns">
      <p>${aRowNum}</p>
      </div>
      <div class="three columns">
      <p>${aStateName}</p>
      </div>
      <div class="three columns">
      <p>${CrimeNum}</p>
      </div>
      <div class="three columns">
      <p>${Statepop}</p>
      </div>
      <div class="two columns">
      <p>${crimeDensity}</p>
      </div>
    </div>
  `;
  return rowHTML;
}

document.getElementById("rankbutton").onclick = () => {
  getgeolocation();
};
