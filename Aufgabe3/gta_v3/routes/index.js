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
   res.render('index', { taglist: [], latitude: req.body.latitude, longitude: req.body.longitude, stringTaglist: "" });
 });
 
 /**
  * Route '/tagging' for HTTP 'POST' requests.
  * (http://expressjs.com/de/4x/api.html#app.post.method)
  *
  * Requests cary the fields of the tagging form in the body.
  * (http://expressjs.com/de/4x/api.html#req.body)
  *
  * Based on the form data, a new geotag is created and stored.
  *
  * As response, the ejs-template is rendered with geotag objects.
  * All result objects are located in the proximity of the new geotag.
  * To this end, "GeoTagStore" provides a method to search geotags 
  * by radius around a given location.
  */
 
 // TODO: ... your code here ...
 router.post('/tagging', (req, res) => {
   let name = req.body.name;
   let latitude = req.body.latitude;
   let longitude = req.body.longitude;
   let hashtag = req.body.hashtag;
 
   let geoTagObject = new GeoTag(name, latitude, longitude, hashtag);
   
   let nearbyGeoTags = tagStore.getNearbyGeoTags({latitude: latitude, longitude: longitude}, radius);
   nearbyGeoTags.push(geoTagObject);
   tagStore.addGeoTag(geoTagObject);
   res.render('index', { taglist: nearbyGeoTags, latitude: latitude, longitude: longitude, stringTaglist: JSON.stringify(nearbyGeoTags)})
 });
 /**
  * Route '/discovery' for HTTP 'POST' requests.
  * (http://expressjs.com/de/4x/api.html#app.post.method)
  *
  * Requests cary the fields of the discovery form in the body.
  * This includes coordinates and an optional search term.
  * (http://expressjs.com/de/4x/api.html#req.body)
  *
  * As response, the ejs-template is rendered with geotag objects.
  * All result objects are located in the proximity of the given coordinates.
  * If a search term is given, the results are further filtered to contain 
  * the term as a part of their names or hashtags. 
  * To this end, "GeoTagStore" provides methods to search geotags 
  * by radius and keyword.
  */
 
 // TODO: ... your code here ...
 router.post('/discovery', (req, res) => {
   let keyword = req.body.keyword;
   let latitude = req.body.latitude;
   let longitude = req.body.longitude;
   let nearbyGeoTags = tagStore.searchNearbyGeoTags(keyword,{latitude: latitude, longitude: longitude}, radius);
 
  
   res.render('index', { taglist: nearbyGeoTags, latitude: req.body.discovery_latitude, longitude: req.body.discovery_longitude, stringTaglist: JSON.stringify(nearbyGeoTags) });
 });
 
 /*
 49.018984
 8.375644
 S-Bahn
 #bahn
 
 49.017248
 8.385470
 Random
 #loc
 */
 
 
 
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
 router.get('/api/geotags', (req, res) => {
  let discoveryQuery = req.query.searchterm;
  let latitudeQuery = req.query.latitude;
  let longitudeQuery = req.query.longitude;
  let filterArray = [];
  let nearbyGeoTags = tagStore.geoTags;
  // if both availlable then filtered
  if (discoveryQuery !== undefined && latitudeQuery !== undefined && longitudeQuery !== undefined) {
      nearbyGeoTags = [];
      filterArray = tagStore.searchNearbyGeoTags(discoveryQuery, {latitude:latitudeQuery, longitude: longitudeQuery}, radius);
      for(let i = 0; i < filterArray.length; i++) {
          distance = tagStore.calculateDistance(filterArray[i], {latitude:latitudeQuery, longitude: longitudeQuery});
          if (distance < radius) {
              nearbyGeoTags.push(filterArray[i]);
          }
      }
      console.log(nearbyGeoTags)
      console.log("Punkt1")
  } else if (latitudeQuery !== undefined && longitudeQuery !== undefined) {
    nearbyGeoTags = tagStore.getNearbyGeoTags({latitude:latitudeQuery, longitude: longitudeQuery}, radius);
    console.log(nearbyGeoTags)
    console.log("Punkt2")
}
  // if searchterm, then filtered
  else if (discoveryQuery !== undefined) {
      nearbyGeoTags = tagStore.searchNearbyGeoTags1(discoveryQuery);

      console.log(nearbyGeoTags)
      console.log("Punkt4")
  }
  // if lat + long available, then filtered
   else {

  console.log(nearbyGeoTags)
  console.log("Punkt3")}

  res.json(JSON.stringify(nearbyGeoTags));
 })
 
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
    tagStore.addGeoTag(geoTagObject);
    res.append('URL', "api/geotags/" + name);
    res.status(201).json(JSON.stringify(tagStore.geoTags));
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
 router.delete('api/geotags/:id', (req, res) => {
  let geoTagID = req.params.id;
  let removedGeoTag = tagStore.removeGeoTag(geoTagID);
  
  
  res.status(201).json(JSON.stringify(removedGeoTag));
 })
 module.exports = router;