var http = require('http');  
http.createServer(function(req, res) {  
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('<!doctype html><html lang="en">  <head>' + 
    '<meta charset="utf-8"><title>Test web page on node.js</title>');
//   window.onload = function () 
//       {
//         var url = document.location.href,
//         params = url.split('?')[1].split('&'),
//         data = {}, 
//         tmp;
//     for (var i = 0, l = params.length; i < l; i++)
//      {
//          tmp = params[i].split('=');
//          data[tmp[0]] = tmp[1];
//      }
//     document.getElementById('here').innerHTML = data.vehicle;
//     document.getElementById('here1').innerHTML = data.days;
// }
res.write('<style>#map {height: 80%;}html, body { height: 100%;margin: 0;padding: 0;     }</style>'+
  '</head>'+' <body><div id="map"></div><div>'+'<h1>Calculate your route</h1><form id="calculate-route" name="calculate-route" action="#" method="get"><label for="from">From:</label><input type="text" id="from" name="from" required="required" placeholder="An address" size="30" /><a id="from-link" href="#">Get my position</a> <br />'
+' <label for="to">To:</label>'+'<input type="text" id="to" name="to" required="required" placeholder="Another address" size="30" /><br>'

 +'<input type="submit" /><input type="reset" /></form></div><div id="result"></div>'+'<p>Vehicle number is</p>'+
'<p id="here"></p><p>Number of days left </p><p id="here1"></p>'+
'<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script><script>');
var WebSocketServer = require('websocket').server;
var http = require('http');
 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
 
wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
 

      var map, infoWindow,pos;

      function initMap() {
       
        infoWindow = new google.maps.InfoWindow;

 
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {

        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: 15
        });




   
 var lineSymbol = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    scale: 8,
    strokeColor: '#393'
  };
   //ws.onmessage = function (event) {
                //x=JSON.parse(event.data);
                //location_details = x.data.res;
                //z = location_details.lat;
                //y=location_details.lon;
  // Create the polyline and add the symbol to it via the 'icons' property.

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8' && message.utf8Data!='undefined') {
          x=JSON.parse(message.utf8Data);
            location_details = x.data.res;
            z = location_details.lat;
            y=location_details.lon;



  var line = new google.maps.Polyline({
    path: [{lat: z, lng: y},
    
    ],
    icons: [{
      icon: lineSymbol,
      offset: '100%'
    }],
    map: map
  });
  connection.sendUTF(message.utf8Data);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

  animateCircle(line);

//};


    var marker = new google.maps.Marker({
    position: map.getCenter(),
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10
    },
    draggable: true,
    map: map
  });

     var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);



   


    pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };

    infoWindow.setPosition(pos);
    infoWindow.setContent('<img src="car.png">');
    infoWindow.open(map);
    map.setCenter(pos);

          }, 
    function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
         
        } 
        else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        
      }
      function animateCircle(line) {
    var count = 0;
    window.setInterval(function() {
      count = (count+0.009) % 200;

      var icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
  }, 100);
}

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }







function calculateRoute(from, to) {
        // Center initialized to Naples, Italy
       

        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
          origin: from,
          destination: to,
          travelMode: google.maps.DirectionsTravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC
        };
        directionsService.route(
          directionsRequest,
          function(response, status)
          {
            if (status == google.maps.DirectionsStatus.OK)
            {
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response
              });
            }
            else
              $("#error").append("Unable to retrieve your route<br />");
          }
        );
      }

      $(document).ready(function() {
        // If the browser supports the Geolocation API
        if (typeof navigator.geolocation == "undefined") {
          $("#error").text("Your browser doesn't support the Geolocation API");
          return;
        }

        $("#from-link").click(function(event) {
          event.preventDefault();
          var addressId = this.id.substring(0, this.id.indexOf("-"));

          navigator.geolocation.getCurrentPosition(function(position) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
              "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
              if (status == google.maps.GeocoderStatus.OK)
                $("#" + addressId).val(results[0].formatted_address);
              else
                $("#error").append("Unable to retrieve your address<br />");
            });
          },
          function(positionError){
            $("#error").append("Error: " + positionError.message + "<br />");
          },
          {
            enableHighAccuracy: true,
            timeout: 10 * 1000 // 10 seconds
          });
        });

        $("#calculate-route").submit(function(event) {
          event.preventDefault();
          calculateRoute($("#from").val(), $("#to").val());
        });
      });


//CALCULTING DISTANCE
$(function() {

  function calculateDistance(from, to) {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
      origins: [from],
      destinations: [to],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    }, callback);
  }

  function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      $('#result').html(err);
    } else {
      var origin = response.originAddresses[0];
      var destination = response.destinationAddresses[0];
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        $('#result').html("There are no roads between " 
                          + origin + " and " + destination);
      } else {
        var distance = response.rows[0].elements[0].distance;
        var distance_value = distance.value;
        var distance_text = distance.text;
        var miles = distance_text.substring(0, distance_text.length - 3);
        $('#result').html("It is " + miles*1.609 + " kilometers from " + origin + " to " + destination);
      }
    }
  }
    
  $('#calculate-route').submit(function(e){
      event.preventDefault();
      var origin = $('#from').val();
      var destination = $('#to').val();
      var distance_text = calculateDistance(origin, destination);
  });
 
});
res.write('<script async defersrc="https://maps.googleapis.com/maps/api/js?key=AIzaSyAz0hnrfaeRLdNvUjQXDzBaShPw3kbmk4s&callback=initMap"></script>'+
'</body></html>');
res.end();
}).listen(8888, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8888');