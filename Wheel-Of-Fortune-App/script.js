
//players Index.html
var players = [];
	function openNewPage()
	{
    //Get element login
		var inputLogin = document.getElementById("login");
		if (!inputLogin.checkValidity()) {
      //Enter login
			document.getElementById("msg").innerHTML = "Enter login";
		} else {
			//document.getElementById("msg").innerHTML = "OK";
      
      //Get name of player
      var x = document.getElementById("login").value;
      
      //While players count is different than 2
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
        //If players size is more than 3 open game.html
				console.log(x);
				players.push(x);
				alert("Welcome");
				sessionStorage.setItem("storageName", players);
				window.open("game.html");
			}
		}		

	}
	
	
//Game.html 
//Get items players to table
 var p = sessionStorage.getItem("storageName");

 //Get to table
  var players = p.split(",");
  var playersScore = [0,0,0];

  //Set players to document
  document.getElementById("player1").innerText = players[0];
  document.getElementById("player2").innerText = players[1];
  document.getElementById("player3").innerText = players[2];

  //Set players score
  document.getElementById("player1Score").innerText = playersScore[0];
  document.getElementById("player2Score").innerText = playersScore[1];
  document.getElementById("player3Score").innerText = playersScore[2];

  //Categories of password on screen
  var categoires = [
  ["Animals", "Wolf", "Dog"],
  ["Food", "Hamburger", "Pizza"],
  ["Films", "Terminator", "Matrix"]
];
    //Create
    setUp();
    var password;
    var cell;
	
  var price = 0;
	var turn = 1;
  var numberOfLetters = 0;
	var isConsolantInPassword = false;
  var isVowelInPassword = false;
  var lettersAlreadyInPassword = "";

  //Random position of cells
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

    //Update score and cells
    function update(){
      var clickCharacter;
      for (i = 0; i < size; i++) {
        if(clickCharacter == passwordArray[i]){
          cell[i].innerText = passwordArray[i];
          playersScore[currentPlayer] += 1;
        }
      }
    }

    function nextPlayerTur(){
      if(currentPlayer > 3){
        currentPlayer = 0
      }
      else 
        currentPlayer++;
    }
		//Alphabet to upper case
    var alphabet = ("abcdefghijklmnopqrstuvwxyz").toUpperCase();
    

    //Display information
    function displayInformation(message) {
      $('#infoRow').fadeOut(500, function() {
        $('#infoRow').text(message);
        $('#infoRow').fadeIn(500);
      });
    }

    function nextTurn() {
      if (turn == 3) {
        turn = 0;
        $("#player3").css("background-color", "#f1f1f1");
      }
      turn++;
      $("#player" + turn).css("background-color", "#e6e600");
      $("#player" + (turn - 1)).css("background-color", "#f1f1f1");
    }
		
//		$.each(alphabet, function(index, value) {
		var i = 0;
        for (i = 0; i < alphabet.length; i++) {
            var button = $('<button style="width:45px;height:45px; id="button">' + alphabet[i] + "</button>");
            if (alphabet[i] === 'A' || alphabet[i] === 'E' || alphabet[i] === 'I' || alphabet[i] === 'O' || alphabet[i] === 'U' || alphabet[i] === 'Y') {
                button.addClass("button-vowel");
            }
            else {
                button.addClass("button-consolant");
            }
            $("#letters_section").append(button);
    }
    //        $('#button').addClass("button-vowel");

    $("#passwordButton").click(function () {
        console.log($("#userPasswordInput").val());
      if(password.toUpperCase()===$("#userPasswordInput").val().toUpperCase()){

          displayInformation("Correct password! " + players[turn - 1] + " won!");

          var i;
          for(i=0;i<password.length;i++){
          cell[i].innerText = password[i];
          }
          var finalplayer = players[turn - 1];
          alert("Correct password! " + players[turn - 1] + " won!");
          sessionStorage.setItem("storageName", finalplayer);
          window.open("final.html");
      }
      else{
        displayInformation("Not correct password, next player turn!");
        nextTurn();
      }
      $("#passwordButton").attr("disabled", true);  
    }
  );

    $(".button-vowel").click(function () {
    
      var currentPlayerScore = parseInt($('#player' + turn + 'Score').text());
      if (isNaN(currentPlayerScore)) {
        currentPlayerScore = 0;
      }
      if(currentPlayerScore < 250) {
        displayInformation('Not enough money to buy a vowel, spin again or guess the password');
        return;
      }

      $('#player' + turn + 'Score').text(currentPlayerScore - 250);

        var i;
        for (i = 0; i < password.length; i++)  {
            if (this.innerText === password[i].toUpperCase()) {
              cell[i].innerText = password[i];
              isVowelInPassword = true;
              numberOfLetters++;
        }
    }

    if(!isVowelInPassword) {
      displayInformation('No vowel in password, next player turn');
      $(".button-vowel").attr("disabled", true);
      nextTurn();
    } else {
      displayInformation('Vowel in password, spin again, buy a vowel or guess the password');
    }
    isVowelInPassword = false;
    numberOfLetters = 0;

  });

  $(".button-consolant").click(function () {
    if(lettersAlreadyInPassword.includes(this.innerText.toUpperCase())) {
      displayInformation('Consolant already guessed, next player turn');
      nextTurn();
      numberOfLetters = 0;
      isConsolantInPassword = false;
      $(".button-consolant").attr("disabled", true);
      return;
    }

      var i;
      for (i = 0; i < password.length; i++) {
          if (this.innerText === password[i].toUpperCase()) {
            cell[i].innerText = password[i];
            numberOfLetters++;
            isConsolantInPassword = true;
            lettersAlreadyInPassword += password[i].toUpperCase();
          }
      }
      $(".button-consolant").attr("disabled", true);

      if(!isConsolantInPassword) {
        displayInformation('No consolant in password, next player turn');
        nextTurn();
      } else {
        $("#passwordButton").attr("disabled", false);
        displayInformation('Consolant in password, spin again, buy a vowel or guess the password');

              var currentPlayerScore = parseInt($('#player' + turn + 'Score').text());
              if (isNaN(currentPlayerScore)) {
                currentPlayerScore = 0;
              }
              $('#player' + turn + 'Score').text(parseInt(price) * numberOfLetters + currentPlayerScore);

        $(".button-vowel").attr("disabled", false);
      }
      numberOfLetters = 0;
      isConsolantInPassword = false;
  });
	
	$(".button-consolant").attr("disabled", true);
  $(".button-vowel").attr("disabled", true);
  $("#passwordButton").attr("disabled", true);
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
          if (m != "") {
              var reward = m;
          }
          else
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
        var text2 = new Konva.Text({
            text: reward,
            fontFamily: 'Calibri',
            fontSize: 20,
            fill: 'white',
            align: 'center',
            stroke: 'yellow',
            strokeWidth: 1,
            rotation: (Math.PI + angle) / 2,
            x: 200,
            y: 20,
            listening: false
        });

          if (m != "") {
              wedge.add(text2);
          }
          else {
              wedge.add(text);
          }
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

              if(price === 'Bankrut'){
                displayInformation('You are broke! Next player turn');
                $('#player' + turn + 'Score').text(0);
                nextTurn();
              } else if(price === "Stop") {
                displayInformation('You lost one turn! Next player turn');
                nextTurn();
              } else{
                $('#infoRow').text('You got ' + price);
                displayInformation('Pick the consolant');
                $(".button-consolant").attr("disabled", false);
              }        
				
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
              if (n == 0) {
                  addWedge(n, "B\na\nn\nk\nr\nu\nt");
              } else if (n == 12) {
                  addWedge(n, "S\nt\no\np");
              }
              else {
                  addWedge(n, "");
              }
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

        // bind events
        wheel.on('mousedown touchstart', function(evt) {
          $(".button-vowel").attr("disabled", true);
          $(".button-consolant").attr("disabled", true);
          $("#passwordButton").attr("disabled", true); 
          angularVelocity = 0;
          controlled = true;
          target = evt.target;
          finished = false;
        });
        // add listeners to container
        stage.addEventListener(
          'mouseup touchend',
          function() {
            controlled = false;
            angularVelocity = getAverageAngularVelocity() * 5;
			
            if (angularVelocity > 20) {
              angularVelocity = 20;
            } else if (angularVelocity < -20) {
              angularVelocity = -20;
            }

            angularVelocities = [];
          },
          false
        );

        stage.addEventListener(
          'mousemove touchmove',
          function(evt) {
            var mousePos = stage.getPointerPosition();
            if (controlled && mousePos && target) {
              var x = mousePos.x - wheel.getX();
              var y = mousePos.y - wheel.getY();
              var atan = Math.atan(y / x);
              var rotation = x >= 0 ? atan : atan + Math.PI;
              var targetGroup = target.getParent();

              wheel.rotation(
                rotation - targetGroup.startRotation - target.angle() / 2
              );
            }
          },
          false
        );

        var anim = new Konva.Animation(animate, layer);

        // wait one second and then spin the wheel
/*        setTimeout(function() {
          anim.start();
        }, 1000);*/
      }
      init();
	    var anim = new Konva.Animation(animate, layer);
      anim.start();
