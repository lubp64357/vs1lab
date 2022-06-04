// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */


 const GeoTag = require("./geotag");
 const GeoTagExamples = require("./geotag-examples");
 
 /**
  * A class for in-memory-storage of geotags
  *
  * Use an array to store a multiset of geotags.
  * - The array must not be accessible from outside the store.
  *
  * Provide a method 'addGeoTag' to add a geotag to the store.
  *
  * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
  *
  * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
  * - The location is given as a parameter.
  * - The proximity is computed by means of a radius around the location.
  *
  * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
  * - The proximity constrained is the same as for 'getNearbyGeoTags'.
  * - Keyword matching should include partial matches from name or hashtag fields.
  */
 
 class InMemoryGeoTagStore {
 
     #geoTags = [];
 
     get geoTags() {
         return this.#geoTags;
     }
 
     addGeoTag(geotag) {
         this.#geoTags.push(geotag);
     }
 
     removeGeoTag(name) {
         for (let i = 0; i < this.#geoTags.length - 1; i++) {
             if (this.#geoTags[i].name === name) {
                 this.#geoTags.splice(i, 1);
             }
         }
     }
 
     getNearbyGeoTags(location, radius) {
         let nearbyGeoTags = [];
         let distance;
        this.#geoTags.forEach(geotag=>{
            distance = this.calculateDistance(location, geotag);
             if (distance <= radius) {
                 nearbyGeoTags.push(geotag);
             }
         });
         return nearbyGeoTags;
     }

    searchNearbyGeoTags(keyword, location,radius) {
        let nearbyGeoTags=this.getNearbyGeoTags(location, radius);
        keyword=keyword.toLowerCase();
        return nearbyGeoTags.filter(function(geotag){
            if(geotag.name.toLowerCase().indexOf(keyword) >= 0||geotag.hashtag.toLowerCase().indexOf(keyword) >= 0) {//if not -1 keyword is in string so returns true if keyword inside name or hashtag
                return true;
                
             }
             else{
                console.log(geotag.name);
                 return false;
             }
        });
    }

    calculateDistance(from, to) {
        let fromX = from.latitude;
        let fromY = from.longitude;
        let toX = to.latitude;
        let toY = to.longitude;
        return Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    }

   tagExamples() {
        let tagList = GeoTagExamples.tagList;
        for (let i = 0; i < (GeoTagExamples.tagList).length; i++) {
                this.addGeoTag(new GeoTag(tagList[i][0], tagList[i][1], tagList[i][2], tagList[i][3]));
        }
    }
}

module.exports = InMemoryGeoTagStore
