// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");
let pageCount=10;
let page=0
let itemCount=0;

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
    console.log(geotags);
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
        });

         //unhide button control
         document.getElementById("pageControls").style.display="flex";
    }
    else{
        document.getElementById("pageControls").style.display="none";
    }

   
}




async function submitTag(evt){
    evt.preventDefault();
   
    let geotag = {
        name: document.getElementById("name").value,
        latitude: document.getElementById("tag_latitude").value,
        longitude: document.getElementById("tag_longitude").value,
        hashtag: document.getElementById("hashtag").value
    }

    let res = await fetch("http://localhost:3000/api/geotags", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(geotag),
    });

    res.json().then(getMapUpdate).then(updateLists);
    document.getElementById("name").value = "";
    document.getElementById("hashtag").value = "";
}

async function submitDiscovery(evt){
    evt.preventDefault();
        //only added latitude and longitude
       let searchTerm = document.getElementById("searchTerm").value;
       let latitude=document.getElementById("discovery_latitude_input").value;
       let longitude=document.getElementById("discovery_longtitude_input").value;

       let url=`http://localhost:3000/api/geotags?latitude=${latitude}&longitude=${longitude}`;
       if (searchTerm!=""){
            url+="&searchterm=" + searchTerm
       }
       let response = await fetch(url);
       response.json().then(getMapUpdate).then(updateLists);

       
       
}

async function movePage(pageDir){
    if(page+pageDir>=0&&page+pageDir<=pageCount){
        page=page+pageDir;
        document.getElementById("page_count").innerText=`${page+1}/${pageCount+1} (${itemCount})`;
        console.log(page);
    }
}



function initSubmitForms(){

    //Tag
    document.getElementById("tag-form").addEventListener("submit", submitTag);
   
   
   //Discovery
   document.getElementById("discoveryFilterForm").addEventListener("submit", submitDiscovery);

}


function initPagination(){
    document.getElementById("page_left").addEventListener("click", event=>{
        movePage(-1);
    });
    document.getElementById("page_right").addEventListener("click", event=>{
        movePage(1);
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

    initSubmitForms();

    initPagination();
       
})