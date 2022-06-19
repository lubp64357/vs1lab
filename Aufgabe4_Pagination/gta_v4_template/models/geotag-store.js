// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */


 const GeoTag = require("./geotag");
 const GeoTagExamples = require("./geotag-examples");
 const {v4 : uuidv4} = require('uuid');

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
 
     #geoTags = {};
     pageItemCount=4;

     get geoTags() {
         return this.#geoTags;
     }
 
     addGeoTag(geotag) {
        let id=uuidv4();
        this.geoTags[id]=geotag;
        return id;
     }
 
     removeGeoTag(name) {
        Object.entries(this.geoTags).forEach(
            (key, value)=>{
                if (value.name === name) {
                    delete this.geoTags.key;
                }
            }
        )
     }

     removeGeoTagById(id){
        if(id in this.geoTags){
            let delTag=this.geoTags[id];
            delete this.geoTags[id];
            return delTag;
         }
         return null;

     }

     /*
     Returns all geotags around the location
     If page=-1 returns all, otherwise returns specific page
     */
     getNearbyGeoTags(location, radius, page=0) {
      
        let nearbyGeoTags = [];
        let distance;

        if(radius===0){ //if no radius just return all tags in array
            for (let [id, geotag] of Object.entries(this.geoTags)) {
                nearbyGeoTags.push(geotag);
         }
        }
        else{
        for (let [id, geotag] of Object.entries(this.geoTags)) {
           distance = this.calculateDistance(location, geotag);
            if (distance <= radius) {
                nearbyGeoTags.push(geotag);
            }
         }
        }

        let itemCount=nearbyGeoTags.length;
         //gebe seitenhaft zurück, falls -1 alle
         
         if(page!=-1){
            let tmpGeotags=[];
            for(let i=page*this.pageItemCount; i<(page+1)*this.pageItemCount&&i<nearbyGeoTags.length; i++){
                tmpGeotags.push(nearbyGeoTags[i]);
            }
            return [tmpGeotags, itemCount];
         }

        return [nearbyGeoTags, itemCount];
    }

    searchNearbyGeoTags(keyword, location,radius, page=0) {

        let nearbyGeoTags=this.getNearbyGeoTags(location, radius, -1)[0];
        keyword=keyword.toLowerCase();
        nearbyGeoTags= nearbyGeoTags.filter(function(geotag){
            if(geotag.name.toLowerCase().indexOf(keyword) >= 0||geotag.hashtag.toLowerCase().indexOf(keyword) >= 0) {//if not -1 keyword is in string so returns true if keyword inside name or hashtag
                return true;
                
             }
             else{
                //console.log(geotag.name);
                 return false;
             }
        });
        let itemCount=nearbyGeoTags.length;
        let pageGeoTags=[];

        for(let i=page*this.pageItemCount; i<(page+1)*this.pageItemCount&&i<nearbyGeoTags.length; i++){
            pageGeoTags.push(nearbyGeoTags[i]);
        }

        return [pageGeoTags, itemCount];


    }
    


    searchGeoTag(id){
        if(id in this.geoTags){
            return this.geoTags[id];
        }
        else{
            return null;
        }
    }

    changeGeoTag(geoTag, id){
        if(id in this.geoTags){
            this.geoTags[id]=geoTag;
         }
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
