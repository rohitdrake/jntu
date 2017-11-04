// getgeolocation: null -> object
// calls getStateCrimeData using its posnObj and returns
// ouput of getStateCrimeData
function getgeolocation() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log("OK!");
      let posnObj = {};
      let crd = pos.coords;
      posnObj.x = crd.latitude;
      posnObj.y = crd.longitude;
      posnObj.accuracy = crd.accuracy;
      getStateCrimeData(posnObj,'/terrorStateStatus',updateDOM);
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


// Sample data for update function
// [
//     [
//         "Patna",
//         1203
//     ],
//     [
//         "Muzaffarpur",
//         900
//     ]
//     ......
function updateDOM(anArray) {
  console.log("OK DOM");
  let content_box = document.getElementById("mainbox");
  let inside_html = `<div class="row">
                    <h1>Ranking of district according to terrorism related activity</h1>
                    </div>
                    <div class="row" style="marigin-top=5%;marigin-bottom=1%;">
                      <div class="four columns">Rank</div>
                      <div class="four columns">District</div>
                      <div class="four columns">Total Crime</div>
                    </div>
                    `;
  let i;
  let len = anArray.length;
  for (i=0; i<len; i++) {
    inside_html = inside_html + giveParaGraph(anArray[i], i+1);
  }
  content_box.innerHTML = inside_html;
}

// sample data for giveParaGraph
//     [
//         "Patna",
//         1203
//     ]
function giveParaGraph(anArray, rank)  {
  return `
      <div class="row">
        <div class="four columns">${rank}</div>
        <div class="four columns">${anArray[0]}</div>
        <div class="four columns">${anArray[1]}</div>
      </div>
  `;
}
window.onload = getgeolocation;
