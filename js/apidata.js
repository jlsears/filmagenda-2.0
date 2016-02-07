'use strict';


//ASSIGNMENT:  write a function that pulls out the current temp after you add a zipcode to a form and hit submit.  It should then display the results in the html body. Apply some nice CSS.

$(document).ready(function() {

    var button = $("#search");

/*    var ipZip = $.get("http://ipinfo.io", function(response) {
            console.log(response);
            $("#location").val(response);
        }, "jsonp");*/

        function findArtist(e) {
        e.preventDefault();
        console.log("findArtist called!!!");
        //var theZip = $("#location").val();
        var suffix = ".json";
        var base_url = "https://api.themoviedb.org/3/search/person?api_key=e4c0718991da519b470bbfa0660756fc&query=tilda?swinton";
          console.log(base_url);
        $.ajax({
            url: base_url,
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

    // API call for general search:
    // https://api.themoviedb.org/3/search/movie?api_key=###&query=batman
    // https://api.themoviedb.org/3/search/person?api_key=e4c0718991da519b470bbfa0660756fc&query=tilda?swinton

    // API call retrieving partial data including performer's API id: 
    // https://api.themoviedb.org/3/find/nm0842770?external_source=imdb_id&api_key=e4c0718991da519b470bbfa0660756fc

    // API call to get full project info: 
    // http://api.themoviedb.org/3/person/3063/combined_credits?api_key=e4c0718991da519b470bbfa0660756fc

    
button.click(findArtist);


});