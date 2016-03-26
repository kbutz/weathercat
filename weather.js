// Template and lots of help writing this from http://api.jquery.com/jquery.getjson/
// Additional help with Jquery and with deciphering JSON results from the following tutorials: 
// http://www.w3schools.com/jquery/ajax_getjson.asp
// https://www.smashingmagazine.com/2012/02/beginners-guide-jquery-based-json-api-clients/
// http://themarklee.com/2014/04/03/pulling-json-data-open-data-api/
(function ($) {
    // Calls function when the <button> is clicked
    $('button').on('click', function () {
        // remove resultset if this has already been run
        $('.results').empty();
        
        // Get whatever is typed in #zip and #country, set as vars
        // OpenWeatherMap API has an "exact match" and "close match" setting, allowing for searching by city name.
        // The upside is that you do not need to know the city's zip code or unique API ID
        // The downside is that it is not very precise, and can make finding the correct city difficult. 
        // For example, Portland, OR and Portland, ME are indistinguishable in this search. I believe the api
        // chooses the largest city and displays that weather data.
        var zip = $('#zip').val();
        var country = $('#country').val();
        var units = $('select option:selected').text();

        // make AJAX call, storing the JSON output in data
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + zip + ',' + country + ',za&units=' + units + '&APPID=0117bf81e4cbdc2ac2892799d1392ee4&mode=json', function (data) {
            
            $(".results").append('<h3>' + data.name + ', ' + data.sys.country + '</h3>');
            if (units == "imperial"){
                $(".results").append('<p><span class="conditionTitle">Current temperature:</span><span class="condition"> ' + data.main.temp + ' &#176;F</span><span></p>');
            }
            else {
                $(".results").append('<p><span class="conditionTitle">Current temperature:</span><span class="condition"> ' + data.main.temp + ' &#176;C</span><span></p>');
            }
            
            
            //Check weather code for general description of weather using OpenWeatherMap's weather codes.
            // One of the JSON sections is an array, thus using array notation for weather[]
            // Blue skies, cat from http://giphy.com/gifs/26yiIkCrJxAqY
            if (data.weather[0].id === 800 || (data.weather[0].id <= 955 && data.weather[0].id >=951)){
                $(".results").append('<p>Weather description: ' + data.weather[0].description + '.</p>');
                $(".results").append('<div class="resultcat"><img src="http://www.kylebutz.com/weathercat/suncat.gif" class="resultcat"/></div>');
            }
            // light clouds, cat from: http://giphy.com/gifs/cH5VGNHfv46vS
            else if (data.weather[0].id <= 804 && data.weather[0].id >= 801){
                $(".results").append('<p>Weather description: ' + data.weather[0].description + '.</p>');
                $(".results").append('<div class="resultcat"><img src="http://www.kylebutz.com/weathercat/cloudcat.gif" class="resultcat"/></div>');

            }
            //severe or strange atmospheric conditions, cats from: http://giphy.com/gifs/halloween-betty-boop-boops-party-vXPvgpgPoKTRu
            else if (data.weather[0].id <= 781 && data.weather[0].id >= 730){
                $(".results").append('<p>Weather description: ' + data.weather[0].description + '.</p>');
                $(".results").append('<div class="resultcat"><img src="http://www.kylebutz.com/weathercat/strangecat.gif" class="resultcat"/></div>');
            }
            //mist or haze
            else if (data.weather[0].id == 701 || data.weather[0].id == 721 || data.weather[0].id == 711){
                $(".results").append('<p>Weather description: ' + data.weather[0].description + '.</p>');
                $(".results").append('<div class="resultcat"><img src="http://www.kylebutz.com/weathercat/fogcat.jpg" width="500px" class="resultcat"/></div>');
            }
            // snow, cat from http://giphy.com/gifs/wUgWRubJHS7Ac
            else if (data.weather[0].id <= 622 && data.weather[0].id >= 600){
                $(".results").append('<p>Weather description: ' + data.weather[0].description + '.</p>');
                $(".results").append('<div class="resultcat"><img src="http://www.kylebutz.com/weathercat/snowcat.gif" class="resultcat"/></div>');
            }
            // rain, cat from http://giphy.com/gifs/cat-animal-weather-h5Bgk3GwjdDUc
            else if (data.weather[0].id <= 531 && data.weather[0].id >= 500){
                $(".results").append('<p>Weather description: ' + data.weather[0].description + '.</p>');
                $(".results").append('<div class="resultcat"><img src="http://www.kylebutz.com/weathercat/raincat.gif" class="resultcat"/></div>');
            }
            // drizzle, cat from: http://theverybesttop10.com/cats-avoiding-the-rain/raincat
            else if (data.weather[0].id <= 321 && data.weather[0].id >= 300){
                $(".results").append('<p>Weather description: ' + data.weather[0].description + '.</p>');
                $(".results").append('<div class="resultcat"><img src="http://www.kylebutz.com/weathercat/drizzlecat.jpg" class="resultcat"/></div>');
            }
            // thunderstorm
            else {
                $(".results").append('<p>Weather description: ' + data.weather[0].description + '.</p>');
                $(".results").append('<div class="resultcat"><img src="http://www.kylebutz.com/weathercat/wetcat.jpg" class="resultcat"/></div>');
            }
        });
    });
}(jQuery));