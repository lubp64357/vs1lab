// File origin: VS1LAB A3

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

 const express = require('express');
 const router = express.Router();
 
 /**
  * The module "geotag" exports a class GeoTagStore. 
  * It represents geotags.
  * 
  * TODO: implement the module in the file "../models/geotag.js"
  */
 // eslint-disable-next-line no-unused-vars
 const GeoTag = require('../models/geotag');
 
 /**
  * The module "geotag-store" exports a class GeoTagStore. 
  * It provides an in-memory store for geotag objects.
  * 
  * TODO: implement the module in the file "../models/geotag-store.js"
  */
 // eslint-disable-next-line no-unused-vars
 const GeoTagStore = require('../models/geotag-store');
 const radius = 1;
 /**
  * Route '/' for HTTP 'GET' requests.
  * (http://expressjs.com/de/4x/api.html#app.get.method)
  *
  * Requests cary no parameters
  *
  * As response, the ejs-template is rendered without geotag objects.
  */
 
 // TODO: extend the following route example if necessary
 
 // define the store here
 var tagStore = new GeoTagStore();
 tagStore.tagExamples();
 
 
 
 router.get('/', (req, res) => {
   res.render('index', { taglist: [], latitude: req.body.latitude, longitude: req.body.longitude, stringTaglist: "[]" });
 });
 
 // API routes (A4)
 
 /**
  * Route '/api/geotags' for HTTP 'GET' requests.
  * (http://expressjs.com/de/4x/api.html#app.get.method)
  *
  * Requests contain the fields of the Discovery form as query.
  * (http://expressjs.com/de/4x/api.html#req.body)
  *
  * As a response, an array with Geo Tag objects is rendered as JSON.
  * If 'searchterm' is present, it will be filtered by search term.
  * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
  */
 
 // TODO: ... your code here ...
 router.get("/api/geotags", (req, res) => {
  
  let latitude = req.query.latitude;
  let longitude = req.query.longitude;

  //for pagination
  let page=parseInt(req.query.page);
  
  let pageCount=0;
  let fullItemCount=0;

  if(req.query.page===undefined){
    page=0;
  }
  let nearbyGeoTagData;
  let tmpRadius=radius;

  if(latitude === undefined || longitude===undefined){
    tmpRadius=0;
  }


  if("searchterm" in req.query){
    let searchterm = req.query.searchterm;

    nearbyGeoTagData= tagStore.searchNearbyGeoTags(searchterm,{latitude: latitude, longitude: longitude}, tmpRadius, page);
  }
  else{
    nearbyGeoTagData=tagStore.getNearbyGeoTags({latitude: latitude, longitude: longitude}, tmpRadius, page);
  }

  let nearbyGeoTags=nearbyGeoTagData[0];
  fullItemCount=nearbyGeoTagData[1];
  pageCount=Math.ceil(fullItemCount/tagStore.pageItemCount);

  res.status(200);
  res.json({
    "pageAmount": tagStore.pageItemCount,
    "itemAmount": fullItemCount,
    "pages": pageCount,
    "page": page,
    "geotags": JSON.stringify(nearbyGeoTags)
  });
  
});
 
 /**
  * Route '/api/geotags' for HTTP 'POST' requests.
  * (http://expressjs.com/de/4x/api.html#app.post.method)
  *
  * Requests contain a GeoTag as JSON in the body.
  * (http://expressjs.com/de/4x/api.html#req.query)
  *
  * The URL of the new resource is returned in the header as a response.
  * The new resource is rendered as JSON in the response.
  */
 
 // TODO: ... your code here ...

  router.post('/api/geotags', (req, res) => {
    let name = req.body.name;
    let latitude = parseFloat(req.body.latitude);
    let longitude = parseFloat(req.body.longitude);
    let hashtag = req.body.hashtag;

    let geoTagObject = new GeoTag(name, latitude, longitude, hashtag);
    let id= tagStore.addGeoTag(geoTagObject);


    //new pagination
    let nearbyGeoTagData=tagStore.getNearbyGeoTags({latitude: latitude, longitude: longitude}, radius, 0);
    let nearbyGeoTags=nearbyGeoTagData[0];
    let fullItemCount=nearbyGeoTagData[1];
    let pageCount=Math.ceil(fullItemCount/tagStore.pageItemCount);
    res.header('Location', "api/geotags/" + id);
    res.status(201);
    res.json({
      "pageAmount": tagStore.pageItemCount,
      "itemAmount": fullItemCount,
      "pages": pageCount,
      "page": 0,
      "geotags": JSON.stringify(nearbyGeoTags)
    });
})
 
 /**
  * Route '/api/geotags/:id' for HTTP 'GET' requests.
  * (http://expressjs.com/de/4x/api.html#app.get.method)
  *
  * Requests contain the ID of a tag in the path.
  * (http://expressjs.com/de/4x/api.html#req.params)
  *
  * The requested tag is rendered as JSON in the response.
  */
 
 // TODO: ... your code here ...
router.get('/api/geotags/:id', (req, res) => {
  let geoTagID = req.params.id

  let foundGeoTag = tagStore.searchGeoTag(geoTagID)

  res.status(200).json(JSON.stringify(foundGeoTag))
})
 
 /**
  * Route '/api/geotags/:id' for HTTP 'PUT' requests.
  * (http://expressjs.com/de/4x/api.html#app.put.method)
  *
  * Requests contain the ID of a tag in the path.
  * (http://expressjs.com/de/4x/api.html#req.params)
  * 
  * Requests contain a GeoTag as JSON in the body.
  * (http://expressjs.com/de/4x/api.html#req.query)
  *
  * Changes the tag with the corresponding ID to the sent value.
  * The updated resource is rendered as JSON in the response. 
  */
 
 // TODO: ... your code here ...
 router.put('/api/geotags/:id', (req, res) => {
   let geoTagID = req.params.id
   
   let geoTag = req.body
   tagStore.changeGeoTag(geoTag, geoTagID)
  
   res.status(202).json(JSON.stringify(geoTag))
 })
 
 /**
  * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
  * (http://expressjs.com/de/4x/api.html#app.delete.method)
  *
  * Requests contain the ID of a tag in the path.
  * (http://expressjs.com/de/4x/api.html#req.params)
  *
  * Deletes the tag with the corresponding ID.
  * The deleted resource is rendered as JSON in the response.
  */
 
 // TODO: ... your code here ...
 router.delete('/api/geotags/:id', (req, res) => {
  let geoTagID = req.params.id;
  let removedGeoTag = tagStore.removeGeoTagById(geoTagID);
  res.status(201);
  res.json(JSON.stringify(removedGeoTag));
 })
 module.exports = router;