// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");


/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */

    
function updateLocation(){
    
    LocationHelper.findLocation(function(helper) {
        if (document.getElementById("tag_latitude").value == "" || document.getElementById("tag_longitude").value == "") {
            document.getElementById("tag_latitude").value = helper.latitude;
            document.getElementById("tag_longitude").value = helper.longitude;
            document.getElementById("discovery_latitude_input").value = helper.latitude;
            document.getElementById("discovery_longtitude_input").value = helper.longitude;}

            let mapManager=new MapManager("EussyP3bKYyMVPyfB8Y46Ng5VVQfBRyY");
            let tagList = JSON.parse(document.getElementById("mapView").getAttribute("data-tags"));
            console.log(tagList);
            let mapQuestUrl=mapManager.getMapUrl(helper.latitude, helper.longitude, tagList);
            document.getElementById("mapView").src=mapQuestUrl;
    });
    
}


// // Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    //alert("Please change the script 'geotagging.js'");
    /*
    get unorderd list from html
    create a new list element and fill this the parameters name, latitude, longitude and hashtag
    added the new created element in the unordered list
    */
    updateLocation();
       
})