// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

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
class InMemoryGeoTagStore{

    static #geotags=[];

    //test method
    static getAllGeoTags(){
        return this.#geotags;
    }
    static addGeoTag(newGeotag){
        this.#geotags.push(newGeotag)
    }

    static removeGeoTag(name){
        for (let i = 0; i < this.#geotags.length; i++) {
                if(this.#geotags[i].name==name){
                    this.#geotags.slice(i,i);
                }
          } 
    }

    static getNearbyGeoTags(latitude, longitude, radius){
        let nearbyGeoTags=[];
        this.#geotags.forEach(geotag=>{
            let distance=Math.sqrt(Math.pow(latitude-geotag.location.latitude,2)+Math.pow(longitude-geotag.location.longitude,2));
            if(distance<=radius){
                nearbyGeoTags.push(geotag)
            }
        })
        return nearbyGeoTags;
    }
    
    static searchNearbyGeoTags(keyword, latitude, longitude, radius){
        let nearbyGeoTags=this.getNearbyGeoTags(latitude, longitude, radius);
        return nearbyGeoTags.filter(function(geotag){
            if(geotag.name.indexOf(keyword) >= 0||geotag.hashtag.indexOf(keyword) >= 0) {//if not -1 keyword is in string so returns true if keyword inside name or hashtag
                return true;
             }
             else{
                 return false;
             }
        });
        
    }

}

module.exports = InMemoryGeoTagStore
