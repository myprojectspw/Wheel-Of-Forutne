//index
var players = [];
	function openNewPage()
	{
		var inputLogin = document.getElementById("login");
		if (!inputLogin.checkValidity()) {
			document.getElementById("msg").innerHTML = "Enter login";
		} else {
			//document.getElementById("msg").innerHTML = "OK";
			var x = document.getElementById("login").value;
			if(players.length != 2)
			{
				alert("Number of players = " + (players.length + 1));
				console.log(x);
				players.push(x);
				var input = document.getElementById("login");
				input.value == ""
			
			}
			else
			{
				console.log(x);
				players.push(x);
				alert("Welcome");
				sessionStorage.setItem("storageName", players);
				window.open("game.html");
			}
		}		

	}
	
	
//game
 var p = sessionStorage.getItem("storageName");
  var players = p.split(",");
  var playersScore = [0,0,0];
  document.getElementById("player1").innerText = players[0];

  document.getElementById("player1Score").innerText = playersScore[0];

  var categoires = [
  ["Animals", "Wolf", "Dog"],
  ["Food", "Hamburger", "Pizza"],
  ["Films", "Terminator", "Matrix"]
];
    setUp();
    var password;
    var cell;
	
  var price = 0;
	var turn = 1;
  var numberOfLetters = 0;
	var isConsolantInPassword = false;
  var isVowelInPassword = false;
  var lettersAlreadyInPassword = "";
  function setUp()
  {
      var categoryId = Math.floor(Math.random()*3+0);
      document.getElementById("categoriaId").innerText = categoires[categoryId][0];
      var PasswordId = Math.floor(Math.random()*2+1);
  
      var pssword = categoires[categoryId][PasswordId];
      var table = document.getElementById("myTable");

      password = pssword;
      var row = table.insertRow(0);
      var size = pssword.length;
  
      var i;
      cell = new Array(size);
      
      for (i = 0; i < size; i++) { 
        cell[i] = row.insertCell(i);
      }
    }
    function update(){
      var clickCharacter;
      for (i = 0; i < size; i++) {
        if(clickCharacter == passwordArray[i]){
          cell[i].innerText = passwordArray[i];
          playersScore[currentPlayer] += 1;
        }
      }
    }

    for(i=0;i<password.length;i++){
      if(password[i].toUpperCase() === 'R' || password[i].toUpperCase() === 'S' || password[i].toUpperCase() === 'T' || password[i].toUpperCase() === 'L' || password[i].toUpperCase() === 'N' || password[i].toUpperCase() === 'E') {
        cell[i].innerText = password[i];
      }
    }


    var timer = 25;
    var x = setInterval(function() {
      timer -= 1;
        $('#timer').text("Time left: " + timer);
        
        if(timer < 0) {
          clearInterval(x);
          alert("KONIEC GRY");
          $('#timer').text("Time left: 0");
        }
      
    }, 1000);


		////
    var alphabet = ("abcdefghijklmnopqrstuvwxyz").toUpperCase();
    
    function displayInformation(message) {
      $('#infoRow').fadeOut(500, function() {
        $('#infoRow').text(message);
        $('#infoRow').fadeIn(500);
      });
    }

    $("#passwordButton").click(function () {
        console.log($("#userPasswordInput").val());
      if(password.toUpperCase()===$("#userPasswordInput").val().toUpperCase()){

          displayInformation("Final round: correct password! " + players[turn - 1] + " won!");

          var i;
          for(i=0;i<password.length;i++){
          cell[i].innerText = password[i];
          }
          alert("Correct password! " + players[turn - 1] + " won!");
          clearInterval(x);
      }
      else{
        displayInformation("Not correct password!");
        clearInterval(x);
        alert("KONIEC GRY");
        $('#timer').text("Time left: 0");
      }
      $("#passwordButton").attr("disabled", true);  
    }
  );

  $("#player" + turn).css("background-color", "#e6e600");


	    var width = 445;//window.innerWidth;
      var height = 445;//window.innerHeight;

      Konva.angleDeg = false;
      var angularVelocity = 6;
      var angularVelocities = [];
      var lastRotation = 0;
      var controlled = false;
      var numWedges = 25;
      var angularFriction = 0.2;
      var target, activeWedge, stage, layer, wheel, pointer;
      var finished = false;

      function getAverageAngularVelocity() {
        var total = 0;
        var len = angularVelocities.length;

        if (len === 0) {
          return 0;
        }

        for (var n = 0; n < len; n++) {
          total += angularVelocities[n];
        }

        return total / len;
      }
      function purifyColor(color) {
        var randIndex = Math.round(Math.random() * 3);
        color[randIndex] = 0;
        return color;
      }
      function getRandomColor() {
        var r = 100 + Math.round(Math.random() * 55);
        var g = 100 + Math.round(Math.random() * 55);
        var b = 100 + Math.round(Math.random() * 55);
        return purifyColor([r, g, b]);
      }

      function getRandomReward() {
        var mainDigit = Math.round(Math.random() * 8 + 1);
        return mainDigit + '\n0\n0';
      }
      function addWedge(n, m) {
          var s = getRandomColor();
          var reward = getRandomReward();
        var r = s[0];
        var g = s[1];
        var b = s[2];
        var angle = (2 * Math.PI) / numWedges;

        var endColor = 'rgb(' + r + ',' + g + ',' + b + ')';
        r += 100;
        g += 100;
        b += 100;

        var startColor = 'rgb(' + r + ',' + g + ',' + b + ')';

        var wedge = new Konva.Group({
          rotation: (2 * n * Math.PI) / numWedges
        });

        var wedgeBackground = new Konva.Wedge({
          radius: 215,
          angle: angle,
          fillRadialGradientStartPoint: 0,
          fillRadialGradientStartRadius: 0,
          fillRadialGradientEndPoint: 0,
          fillRadialGradientEndRadius: 215,
          fillRadialGradientColorStops: [0, startColor, 1, endColor],
          fill: '#64e9f8',
          fillPriority: 'radial-gradient',
          stroke: '#ccc',
          strokeWidth: 2
        });

        wedge.add(wedgeBackground);

        var text = new Konva.Text({
          text: reward,
          fontFamily: 'Calibri',
          fontSize: 30,
          fill: 'white',
          align: 'center',
          stroke: 'yellow',
          strokeWidth: 1,
          rotation: (Math.PI + angle) / 2,
          x: 180,
          y: 15,
          listening: false
          });

        wedge.add(text);
        text.cache();

        wedge.startRotation = wedge.rotation();

        wheel.add(wedge);
      }
      function animate(frame) {
        // handle wheel spin
        var angularVelocityChange =
          (angularVelocity * frame.timeDiff * (1 - angularFriction)) / 1000;
        angularVelocity -= angularVelocityChange;

        // activate / deactivate wedges based on point intersection
        var shape = stage.getIntersection({
          x: stage.width() / 2,
          y: 100
        });

        if (controlled) {
          if (angularVelocities.length > 10) {
            angularVelocities.shift();
          }

          angularVelocities.push(
            ((wheel.rotation() - lastRotation) * 1000) / frame.timeDiff
          );
        } else {
          var diff = (frame.timeDiff * angularVelocity) / 1000;
          if (diff > 0.0001) {
            wheel.rotate(diff);
          } else if (!finished && !controlled) {
            if (shape) {
              var text = shape
                .getParent()
                .findOne('Text')
                .text();
              price = text.split('\n').join('');

                $('#infoRow').text('You got ' + price + " x3");
                var currentPlayerScore = parseInt($('#player' + turn + 'Score').text());
                if (isNaN(currentPlayerScore)) {
                  currentPlayerScore = 0;
                }
                $('#player' + turn + 'Score').text(parseInt(price) * 3 + currentPlayerScore);
      
				
              }
            finished = true;
          }
        }
        lastRotation = wheel.rotation();

        if (shape) {
          if (shape && (!activeWedge || shape._id !== activeWedge._id)) {
            pointer.y(20);

            new Konva.Tween({
              node: pointer,
              duration: 0.3,
              y: 30,
              easing: Konva.Easings.ElasticEaseOut
            }).play();

            if (activeWedge) {
              activeWedge.fillPriority('radial-gradient');
            }
            shape.fillPriority('fill');
            activeWedge = shape;
          }
        }
      }
      function init() {
        stage = new Konva.Stage({
          container: 'container',
          width: width,
          height: height
        });
        layer = new Konva.Layer();
        wheel = new Konva.Group({
          x: stage.width() / 2,
          y: 230
        });

          for (var n = 0; n < numWedges; n++) {
              
            addWedge(n, "");
        }
        pointer = new Konva.Wedge({
          fillRadialGradientStartPoint: 0,
          fillRadialGradientStartRadius: 0,
          fillRadialGradientEndPoint: 0,
          fillRadialGradientEndRadius: 30,
          fillRadialGradientColorStops: [0, 'white', 1, 'red'],
          stroke: 'white',
          strokeWidth: 2,
          lineJoin: 'round',
          angle: 1,
          radius: 30,
          x: stage.width() / 2,
          y: 33,
          rotation: -90,
          shadowColor: 'black',
          shadowOffset: 3,
          shadowBlur: 2,
          shadowOpacity: 0.5
        });

        // add components to the stage
        layer.add(wheel);
        layer.add(pointer);
        stage.add(layer);

        var anim = new Konva.Animation(animate, layer);
      }
      init();
	    var anim = new Konva.Animation(animate, layer);
      anim.start();
