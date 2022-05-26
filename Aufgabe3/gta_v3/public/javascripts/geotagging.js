// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

function updateLocation(){
    
    LocationHelper.findLocation(function(helper) {
        if (document.getElementById("latitude").value == "" || document.getElementById("longitude").value == "") {
            document.getElementById("latitude").value = helper.latitude;
            document.getElementById("longitude").value = helper.longitude;
            document.getElementById("discovery_latitude").value = helper.latitude;
            document.getElementById("discovery_longtitude").value = helper.longitude;
        }
        let mapManager=new MapManager("XCbGiqL4T1sCHHoOW44CjYAeZg15xNPo");
        taglist = JSON.parse(document.getElementById("mapView").data-tags);
        let mapQuestUrl=mapManager.getMapUrl(helper.latitude, helper.longitude, [], 18, taglist);
        document.getElementById("mapView").src=mapQuestUrl;
    });
    
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    //alert("Please change the script 'geotagging.js'");
    /*
    get unorderd list from html
    create a new list element and fill this the parameters name, latitude, longitude and hashtag
    added the new created element in the unordered list
    */
    updateLocation();
    /*
    document.getElementById("addTag").addEventListener("click", function () {
        var ul = document.getElementById("discovery__results_unorderedList");
        var li = document.createElement("li");
        let name = document.querySelector("#name").value;
        let hash = document.querySelector("#hashtag").value;
        let latitude = document.querySelector("#latitude").value;
        let longitude = document.querySelector("#longitude").value;
        li.appendChild(document.createTextNode(name + " (" + latitude +", " + longitude + ") " + hash));
        ul.appendChild(li);
    });*/
       
});