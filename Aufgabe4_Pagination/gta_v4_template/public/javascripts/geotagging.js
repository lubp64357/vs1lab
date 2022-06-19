// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");
let pageCount=10;
let page=0;
let itemCount=0;
let lastSearchTerm="";

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function useDebugLocation(){
    document.getElementById("tag_latitude").value=49.015636;
    document.getElementById("tag_longitude").value=8.389318;
    document.getElementById("discovery_latitude_input").value = 49.015636;
    document.getElementById("discovery_longtitude_input").value =8.389318;
}
    
async function updateLocation(){
    
    await LocationHelper.findLocation(async function(helper) {
        if (document.getElementById("tag_latitude").value == "" || document.getElementById("tag_longitude").value == "") {
            document.getElementById("tag_latitude").value = helper.latitude;
            document.getElementById("tag_longitude").value = helper.longitude;
            document.getElementById("discovery_latitude_input").value = helper.latitude;
            document.getElementById("discovery_longtitude_input").value = helper.longitude;}

            
            //let tagList = JSON.parse(document.getElementById("mapView").getAttribute("data-tags"));
            //console.log(tagList);
            useDebugLocation();
            //new Pagination start call: lädt alle tags in der Nähe
            let url=`http://localhost:3000/api/geotags?latitude=${helper.latitude}&longitude=${helper.longitude}`;
            let response = await fetch(url);
            response.json().then(geotagData=>{
                getMapUpdate(geotagData["geotags"]);
                updateLists(geotagData);
                itemCount=geotagData["itemAmount"];
                pageCount=geotagData["pages"];
                page=0;
                updatePaginationHtml();
            });
            


            //let mapManager=new MapManager("EussyP3bKYyMVPyfB8Y46Ng5VVQfBRyY");
            //let mapQuestUrl=mapManager.getMapUrl(helper.latitude, helper.longitude, tagList);
            //.getElementById("mapView").src=mapQuestUrl;
    });
    
}

function getMapUpdate(geotags){
    console.log(geotags);
    const zoom=14;

    let mapManager = new MapManager("EussyP3bKYyMVPyfB8Y46Ng5VVQfBRyY");
    let latitude = document.getElementById("tag_latitude").value;
    let longitude = document.getElementById("tag_longitude").value;
    let mapQuestUrl = mapManager.getMapUrl(latitude, longitude, JSON.parse(geotags), zoom);
    document.getElementById("mapView").src=mapQuestUrl;
}


function updateLists(geotagData){
    let tagList = JSON.parse(geotagData["geotags"]);

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
                         //set list help values

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


    lastSearchTerm="";

    res.json().then(geotagData=>{
        getMapUpdate(geotagData["geotags"]);
        updateLists(geotagData);
        itemCount=geotagData["itemAmount"];
        pageCount=geotagData["pages"];
        page=0;
        updatePaginationHtml();
    });
    document.getElementById("name").value = "";
    document.getElementById("hashtag").value = "";
}

async function submitDiscovery(evt){
    evt.preventDefault();
    //only added latitude and longitude
    lastSearchTerm = document.getElementById("searchTerm").value;
    page=0;
    let latitude=document.getElementById("discovery_latitude_input").value;
    let longitude=document.getElementById("discovery_longtitude_input").value;

    let url=`http://localhost:3000/api/geotags?latitude=${latitude}&longitude=${longitude}&page=${page}`;
    if (lastSearchTerm!=""){
        url+="&searchterm=" + lastSearchTerm
    }
    let response = await fetch(url);
    response.json().then(geotagData=>{
        getMapUpdate(geotagData["geotags"]);
        updateLists(geotagData);
        itemCount=geotagData["itemAmount"];
        pageCount=geotagData["pages"];
        updatePaginationHtml();
    });
}



async function movePage(pageDir){
    if(page+pageDir>=0&&page+pageDir<=pageCount-1){
        page=page+pageDir;
        updatePaginationHtml();
        loadPage();
    }
}

async function loadPage(){
    let latitude=document.getElementById("discovery_latitude_input").value;
    let longitude=document.getElementById("discovery_longtitude_input").value;

    let url=`http://localhost:3000/api/geotags?latitude=${latitude}&longitude=${longitude}&page=${page}`;
    if (lastSearchTerm!=""){
        url+="&searchterm=" + lastSearchTerm
    }
    let response = await fetch(url);
    response.json().then(val=>{
        getMapUpdate(val["geotags"]);
        updateLists(val);
    });
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

function updatePaginationHtml(){
    document.getElementById("page_count").innerText=`${page+1}/${pageCount} (${itemCount})`;
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