const express = require('express');
const router  = express.Router();
const request = require('request');


router.use(
  (req, res, next) => {
    let anObj = {city_obj: req.city_obj, total_city_obj: req.total_city_obj};
    // if ((!req.city_obj.crime_rate) && (!req.city_obj.total_crime)) {
    //   req.city_obj.crime_rate = 824.2;
    //   req.city_obj.total_crime = 16871;
    // }
    // if((!(req.city_name == "Bihar"))) {
    //   req.city_name = "Patna";
    // }
    let city_bar = (req.city_obj.crime_rate / 10);
    let country_bar = (req.total_city_obj.crime_rate / 10);
    let contribution_bar = ( 100 * (req.city_obj.total_crime / req.total_city_obj.total_crime));
    console.log(contribution_bar);
    console.log(anObj);
    res.send(
      `
      <!DOCTYPE html>
      <html>
      <style>
      #myProgress {
        width: 100%;
        background-color: #ddd;
      }

      #myBar {
        width: 0%;
        height: 30px;
        background-color: red;
        text-align: center;
        line-height: 30px;
        color: white;
      }

      #myProgress2 {
        width: 100%;
        background-color: #ddd;
      }

      #myBar2 {
        width: 0%;
        height: 30px;
        background-color: green;
        text-align: center;
        line-height: 30px;
        color: white;
      }

      #myProgress3 {
        width: 100%;
        background-color: #ddd;
      }

      #myBar3 {
        width: 0%;
        height: 30px;
        background-color: blue;
        text-align: center;
        line-height: 30px;
        color: white;
      }

      button {
        visibility: hidden;
      }
      #manishman {
        visibility: visible;
      }
      </style>
      <body>

      <h2>${req.city_name} crime rate:-</h2>

      <div id="myProgress">
      <div id="myBar">0%</div>
      </div>

      <br>
      <button id="xyz" onclick="move()">Click Me</button>

      <h2>Country average crime rate:-</h2>

      <div id="myProgress2">
      <div id="myBar2">0%</div>
      </div>
      <br>
      <br>
      <button id="xyza" onclick="move2()">Click Me</button>

      <h2>${req.city_name} contribution in total crime:- </h2>
      <div id="myProgress3">
      <div id="myBar3">0%</div>
      </div>

      <br>
      <button id="xyzab" onclick="move3()">Click Me</button>
      <br>
      <br>
      <a href="/"><button id="manishman"><h3>HOME</h3></button></a>

      <script>
      function move() {
        var elem = document.getElementById("myBar");
        var width = 0;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= ${city_bar}) {
            clearInterval(id);
          } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1  + '%';
          }
        }
      }
      document.getElementById("xyz").click();

      function move2() {
        var elem = document.getElementById("myBar2");
        var width = 0;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= ${country_bar}) {
            clearInterval(id);
          } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1  + '%';
          }
        }
      }
      document.getElementById("xyza").click();

      function move3() {
        var elem = document.getElementById("myBar3");
        var width = 0;
        var id = setInterval(frame, 10);
        function frame() {
          if (width >= ${contribution_bar}) {
            clearInterval(id);
          } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1  + '%';
          }
        }
      }
      document.getElementById("xyzab").click();
      </script>

      </body>
      </html>
      `
    );
  }
)

module.exports = router;
