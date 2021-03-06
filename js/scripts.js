    var map = new L.Map('map', { 
      center: [37,-96.2],
      zoom: 4
    });
    //Instatiate map
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    var layerUrl = 'https://raj331.carto.com/api/v2/viz/4f18adfc-0794-11e7-b321-0ecd1babdde5/viz.csv';

    cartodb.createLayer(map, layerUrl)
      .addTo(map)
      .on('done', function(layer) {

        // get layer from Carto
        var acc_2015 = layer.getSubLayer(1);
        acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, st_case, ve_total FROM acc_15wmetro');

        //set default sql that to query server
        var activesql = "acc_15wmetro"; 

        // event listeners to change the SQL for the carto layer
        //Total vehicle filters
        $('#VTB1').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE ve_total = 1"
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, ve_total FROM ' + activesql);
           $('#VTB1').css("background-color", "#00CED1"); //highlights button when selected
           $('#VTB2').css("background-color", "");        //turns off other buttons highlighting
           $('#VTB3').css("background-color", "");
           $('#VTB4').css("background-color", "");
        });
          
        $('#VTB2').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE ve_total = 2";
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, ve_total FROM ' + activesql);
           $('#VTB2').css("background-color", "#00CED1");
           $('#VTB1').css("background-color", "");
           $('#VTB3').css("background-color", "");
           $('#VTB4').css("background-color", "");
        });
         $('#VTB3').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE ve_total = 3";
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, ve_total FROM ' + activesql);
           $('#VTB3').css("background-color", "#00CED1");
           $('#VTB1').css("background-color", "");
           $('#VTB2').css("background-color", "");
           $('#VTB4').css("background-color", "");
        });
         $('#VTB4').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE ve_total > 3";
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, ve_total FROM acc_15wmetro WHERE ve_total > 3');
           $('#VTB4').css("background-color", "#00CED1");
           $('#VTB1').css("background-color", "");
           $('#VTB2').css("background-color", "");
           $('#VTB3').css("background-color", "");
        });

         //Fatalities filters
        $('#FTB1').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE fatals = 1";
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, ve_total, fatals FROM ' + activesql);
           $('#FTB1').css("background-color", "#00CED1");
           $('#FTB2').css("background-color", "");
           $('#FTB3').css("background-color", "");   
        });
        $('#FTB2').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE fatals = 2";
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, ve_total, fatals FROM ' + activesql);
           $('#FTB2').css("background-color", "#00CED1");
           $('#FTB1').css("background-color", "");
           $('#FTB3').css("background-color", "");
        });
        $('#FTB3').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE fatals = 3";
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, ve_total, fatals FROM ' + activesql);
           $('#FTB3').css("background-color", "#00CED1");
           $('#FTB1').css("background-color", "");
           $('#FTB2').css("background-color", "");
        });

        //Drunk Driver filters
        $('#DDB1').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE drunk_dr = 0";
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, ve_total, drunk_dr FROM ' + activesql);
           $('#DDB1').css("background-color", "#00CED1");
           $('#DDB2').css("background-color", "");
           $('#DDB3').css("background-color", "");   
        });
        $('#DDB2').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE drunk_dr = 1";
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, ve_total, drunk_dr FROM ' + activesql);
           $('#DDB2').css("background-color", "#00CED1");
           $('#DDB1').css("background-color", "");
           $('#DDB3').css("background-color", "");
        });
        $('#DDB3').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE drunk_dr > 1";
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, ve_total, drunk_dr FROM ' + activesql);
           $('#DDB3').css("background-color", "#00CED1");
           $('#DDB1').css("background-color", "");
           $('#DDB2').css("background-color", "");
        });

          //month filters
          $('.month-menu li').on('click', function(e) {
            $.fn.filtreset(); //turns off all text indications of other filters
            var targetID = e.currentTarget.id; //get id from element
            var month = targetID.substring(3,5); //put in usable form
            activesql = "acc_15wmetro WHERE month = " + month; //add to query
            acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, month FROM ' + activesql); //run query
            $('#monthmenu').empty(); //clear text button
            $('#monthmenu').append('Month: ' + e.currentTarget.innerText); //set text button to current selection
         });

        //Hour of the day
        $('.hour-menu li').on('click', function(e) {
            $.fn.filtreset();
            var targetID = e.currentTarget.id;
            var hour = targetID.substring(1,3);
            activesql = "acc_15wmetro WHERE hour = " + hour;
            acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, hour FROM ' + activesql);
            $('#hourmenu').empty();
            $('#hourmenu').append('Hour: ' + e.currentTarget.innerText);
         });

         //Day of the week
        $('.DoW-menu li').on('click', function(e) {
            $.fn.filtreset();
            var targetID = e.currentTarget.id;
            var DoW = targetID.toString().substring(2,3);
            activesql = "acc_15wmetro WHERE day_week = " + DoW;
            acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, day_week FROM ' + activesql);
            $('#DoWmenu').empty();
            $('#DoWmenu').append('Day of the Week: ' + e.currentTarget.innerText);
         });

        //Weather
            $('.weather-menu li').on('click', function(e) {
            $.fn.filtreset();
            var targetID = e.currentTarget.id;
            var weather = targetID.toString().substring(3,5);
            activesql = "acc_15wmetro WHERE weather = " + weather + "OR weather1 = " + weather + "OR weather2 = " + weather;
            acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, weather FROM ' + activesql);
            $('#weathermenu').empty();
            $('#weathermenu').append('Weather: ' + e.currentTarget.innerText);
         });

         //Urban or rural built environment buttons
         $('#rural').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE rur_urb = 1";
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, rur_urb FROM ' + activesql);
          $('#rur_urb').empty();//reset button text
          $('#rur_urb').append('Rural or Urban (Rural Selected)');
         });
         $('#urban').on('click', function() {
           $.fn.filtreset();
           activesql = "acc_15wmetro WHERE rur_urb = 2";
           acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, rur_urb FROM ' + activesql);
           $('#rur_urb').empty(); //reset button text
           $('#rur_urb').append('Rural or Urban (Urban Selected)');
         });

         //State Select
         $('.state-menu li').on('click', function(e) {
            $.fn.filtreset();
            var targetID = e.currentTarget.id;
            var stateNo = targetID.toString().substring(2,4);
            activesql = "acc_15wmetro WHERE state = " + stateNo;
            acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, state FROM ' + activesql);
            $('#statemenu').empty();
            $('#statemenu').append('State: ' + e.target.id);
            sql.getBounds('SELECT cartodb_id, the_geom, the_geom_webmercator, name, state FROM ' + activesql).done(function(bounds) {
            map.fitBounds(bounds);
            });
         });

         //Metro Select
          $('.metro-menu li').on('click', function(e) {
            $.fn.filtreset();
            var targetID = e.currentTarget.id;
            var metroNo = targetID.toString().substring(3,8);
            activesql = "acc_15wmetro WHERE geoid = '" + metroNo + "'";
            acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, geoid FROM ' + activesql);
            $('#metromenu').empty();
            $('#metromenu').append('Metro Area: ' + e.currentTarget.innerText);
            sql.getBounds('SELECT cartodb_id, the_geom, the_geom_webmercator, name, geoid FROM ' + activesql).done(function(bounds) {
            map.fitBounds(bounds);
            });
         });

        //Create a filter reset function
        $(document).ready(function(){
          $.fn.filtreset = function(){
            acc_2015.setSQL('SELECT cartodb_id, the_geom, the_geom_webmercator, name, ve_total FROM acc_15wmetro');
          $('.btn').attr('style','');
          activesql = "acc_15wmetro"; //resets sql count query
          $('#rur_urb').empty();      //returns all button titles to original state
          $('#rur_urb').append('Rural or Urban');
          $('#statemenu').empty();
          $('#statemenu').append('State');
          $('#metromenu').empty();
          $('#metromenu').append('Metro Area');
          $('#DoWmenu').empty();
          $('#DoWmenu').append('Day of the Week');
          $('#monthmenu').empty();
          $('#monthmenu').append('Month');
          $('#hourmenu').empty();
          $('#hourmenu').append('Hour');
          $('#weathermenu').empty();
          $('#weathermenu').append('Weather');
          }
        });

         //Reset Button
        $('#reset').on('click', function() {
          $.fn.filtreset();   //runs above function to clear out buttons
          sql.getBounds('SELECT cartodb_id, the_geom, the_geom_webmercator, name, state FROM ' + activesql).done(function(bounds) {
            map.fitBounds(bounds); //resets map's view
          });
        });

        //Reset Button Dropdowns
        //Reset Map view
        $('#resetmap').on('click', function() {
          activesql = "acc_15wmetro";
          sql.getBounds('SELECT cartodb_id, the_geom, the_geom_webmercator, name, state FROM ' + activesql).done(function(bounds) {
            map.fitBounds(bounds);
          });
        });

        //Reset filter
        $('#resetfilter').on('click', function() {
          $.fn.filtreset();
        });


        // set interactivity
        /* After extensive testing and getting interactivity to work on the 2014 map, it was found that interactivity conflicted
        with several of the setsql filters. The cause of this error is unknown, but I will explore ways to get around this issue  
        in future iterations of this site*/
         acc_2015.setInteraction(true);
         //acc_2015.setInteractivity('name');

        // Interactivity for this layer
         acc_2015.on('featureClick', function(e, latlng, pos, data, layerNumber) {
          $('#SCID').empty();
          $('#SCID').append('Metro Area: ' + data.name + '<br/>')
          $('#SCID').append('Case Number: ' + data.st_case)
          console.log('hello');
        });

         //give initial count
          var sql = new cartodb.SQL({ user: 'raj331' });
          sql.execute('SELECT count(*) FROM ' + activesql)
          .done(function(data) {
            $('#AD').empty();
            $('#AD').append(data.rows[0].count);
          });
       
       //give count on click update
        $('#sidebar').on('click', function(){
          var sql = new cartodb.SQL({ user: 'raj331' });
          sql.execute('SELECT count(*) FROM ' + activesql) //counts the rows in current filter
          .done(function(data) {
            $('#AD').empty();
            $('#AD').append(data.rows[0].count);          //displays count of how many rows/accidents in filter
          });
        });

        //Set downloader by converting activesql to usable format
        $(document).on('click', function(){
          var asqlnk = activesql.replace(/ /g, "+"); //formats query with + instead of spaces
          var prevlink = "https://raj331.carto.com/api/v2/sql?format=csv&q=SELECT+*+FROM+" + asqlnk; //makes full query
          $("#downloader").attr("href", prevlink);
        });

      }).on('error', function() {
        //log the error
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