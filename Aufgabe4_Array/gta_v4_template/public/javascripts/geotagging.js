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

function getMapUpdate(geotags){
    let mapManager = new MapManager("EussyP3bKYyMVPyfB8Y46Ng5VVQfBRyY");
    let latitude = document.getElementById("tag_latitude").value;
    let longitude = document.getElementById("tag_longitude").value;
    let mapQuestUrl = mapManager.getMapUrl(latitude, longitude, JSON.parse(geotags))
    document.getElementById("mapView").src=mapQuestUrl
    return geotags;

}


function updateLists(geotags){
    let tagList = JSON.parse(geotags);

    if(tagList !== undefined){
        let list = document.getElementById("discovery__results_unorderedList")
        list.innerHTML= "";
        tagList.forEach(function (gtag){
            let li = document.createElement("li");
            li.innerHTML = gtag.name + " (" + gtag.latitude + ", " + gtag.longitude + ") " + gtag.hashtag;
            list.appendChild(li);
        })
    }
}


async function postAdd(geotag){
    let res = await fetch("http://localhost:3000/api/geotags", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(geotag),
    });

    return await res.json();
}

async function getTagList(searchTerm) {
    
    let response = await fetch("http://localhost:3000/api/geotags?searchterm=" + searchTerm);
    
    
    return await response.json();
}



document.getElementById("tag-form").addEventListener("submit", function (evt) {
     evt.preventDefault();

    let geotag = {
        name: document.getElementById("name").value,
        latitude: document.getElementById("tag_latitude").value,
        longitude: document.getElementById("tag_longitude").value,
        hashtag: document.getElementById("hashtag").value
    }

    postAdd(geotag).then(getMapUpdate).then(updateLists);
    document.getElementById("name").value = "";
    document.getElementById("hashtag").value = "";
}, true);



document.getElementById("discoveryFilterForm").addEventListener("submit", function (evt) {
     evt.preventDefault();

    let searchTerm = document.getElementById("searchTerm").value;

    getTagList(searchTerm).then(getMapUpdate).then(updateLists);
}, true);

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