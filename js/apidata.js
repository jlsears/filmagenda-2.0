'use strict';


//ASSIGNMENT:  write a function that pulls out the current temp after you add a zipcode to a form and hit submit.  It should then display the results in the html body. Apply some nice CSS.

$(document).ready(function() {

    var button = $("#search");

    var ipZip = $.get("http://ipinfo.io", function(response) {
            console.log(response.postal);
            $("#location").val(response.postal);
        }, "jsonp");

        function findArtist(e) {
        e.preventDefault();
        //var theZip = $("#location").val();
        var suffix = ".json";
        var base_url = "https://api.themoviedb.org/3/movie/550?api_key=e4c0718991da519b470bbfa0660756fc";
          console.log(base_url + theZip + suffix);
        $.ajax({
            url: base_url + theZip + suffix,
            dataType: "jsonp",
            success: function(data){
                console.log(data);
                $("#artistproject").append(data);
/*                $("#div2").append(data.current_observation.local_time_rfc822)
                $("#div4").append("The current temp for this zip code is ", data.current_observation.temperature_string);
                $("#div5").append("<img src='" + data.current_observation.icon_url +"'>");
*/            }
         })   

    }

    // API call retrieving partial data: https://api.themoviedb.org/3/find/nm0842770?external_source=imdb_id&api_key=e4c0718991da519b470bbfa0660756fc

    
button.click(findArtist);


});