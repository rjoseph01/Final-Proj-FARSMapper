    var map = new L.Map('map', { 
      center: [35,-78],
      zoom: 4
    });

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    var layerUrl = 'https://raj331.carto.com/api/v2/viz/4f18adfc-0794-11e7-b321-0ecd1babdde5/viz.json';

    cartodb.createLayer(map, layerUrl)
      .addTo(map)
      .on('done', function(layer) {

        // get layer from Carto
        var acc_2015 = layer.getSubLayer(0);



        // event listeners to change the SQL for the carto layer
        $('#VTB1').on('click', function() {
           acc_2015.setSQL('SELECT the_geom, the_geom_webmercator, name, ve_total FROM acc_15wmetro WHERE ve_total = 1');
           alert('this should work');
        });
        $('#VTB2').on('click', function() {
           acc_2015.setSQL('SELECT the_geom, the_geom_webmercator, name, ve_total FROM acc_15wmetro WHERE ve_total = 2');
        });
         $('#VTB3').on('click', function() {
           acc_2015.setSQL('SELECT the_geom, the_geom_webmercator, name, ve_total FROM acc_15wmetro WHERE ve_total = 3');
        });
         $('#VTB4').on('click', function() {
           acc_2015.setSQL('SELECT the_geom, the_geom_webmercator, name, ve_total FROM acc_15wmetro WHERE ve_total > 3');
        });


        // $('.reset').on('click', function() {


        //   acc_2015.setSQL('SELECT the_geom, the_geom_webmercator, agency, agency_nam, complaint_, descriptor FROM table_311_1 WHERE agency = \'TLC\'');
        // });

        // set interactivity
         acc_2015.setInteraction(true);
         acc_2015.setInteractivity('nameslad');

        // Interactivity for this layer
         acc_2015.on('featureClick', function(e, latlng, pos, data, layerNumber) {
          //$('#SCID').empty();
          $('#SCID').append('Metro Area: ' + data.name + '<br/>')
          //$('#AD').append('Descriptor: ' + data.descriptor)
        });

         var acc_count = acc_2015.setSQL('SELECT count(*) FROM acc_15wmetro');
        console.log(acc_count);
        $('#AD').empty();
        $('#AD').append(acc_count);

      }).on('error', function() {
        //log the error
      });


    // Use the SQL API to get raw data from carto

    var apiCall = 'https://raj331.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20acc_15wmetro%20WHERE%20cartodb_id=1'

    $.getJSON(apiCall, function(data) {
      console.log(data);
    })

    // geojson API CALL

    var geojsonApiCall = 'https://raj331.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20acc_15wmetro%20WHERE%20cartodb_id=23454&format=geojson';

    $.getJSON(geojsonApiCall, function(data) {
      console.log(data);

      L.geoJson(data).addTo(map);
    });

//Sidebar Button Panel Operation
//Default Hidden Panels
$('.envchar').hide();
$('.geochar').hide();

//Switch panel on button click
$('#envbut').on('click', function(){
  $('.envchar').show();
  $('.physchar').hide();
  $('.geochar').hide();
})
$('#geobut').on('click', function(){
  $('.geochar').show();
  $('.physchar').hide();
  $('.envchar').hide();
})
$('#physbut').on('click', function(){
  $('.physchar').show();
  $('.envchar').hide();
  $('.geochar').hide();
})