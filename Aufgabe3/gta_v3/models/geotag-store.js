// File origin: VS1LAB A3
const geoTagList = require("../models/geotag-examples");
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

    
    // TODO: ... your code here ...
    geoTags = geoTagList.tagList;
    static get geoTags() { return geoTags}


    addGeoTag(geotag) {
        this.geoTags.push(geotag);
    }

    removeGeoTag(name) {
        for (let i = 0; i < this.geoTags.length - 1; i++) {
            if (this.geoTags[i].name === name) {
                this.geoTags.splice(i, 1);
            }
        }
    }

    getNearbyGeoTags(location) { // Funktioniert nicht
        let nearbyGeoTags = [];
        let distance;
        
        
        for (let i = 0; i < this.geoTags.length; i++) {
            distance = this.calculateDistance(location, this.geoTags[i]);
            if (distance < 5) {
                nearbyGeoTags.push(this.geoTags[i]);
            }
        }
        return nearbyGeoTags;
    }

    searchNearbyGeoTags(keyword) {
        
        let geoTagMatching;
        let nearbyGeoTags = [];
        let geoTagName;
        let geoTagHashtag;


        for (let i = 0; i < this.geoTags.length - 1; i++) {
            geoTagName = this.geoTags[i].name;
            geoTagHashtag = this.geoTags[i].hashtag;
            if ((new RegExp(keyword).test(geoTagName)) || (new RegExp(keyword).test(geoTagHashtag))) {
                geoTagMatching = this.geoTags[i];
            
                    nearbyGeoTags.push(geoTagMatching);

            }
        }

        return nearbyGeoTags;
    }

    calculateDistance(from, to) {
        let fromX = from.latitude;
        let fromY = from.longitude;
        let toX = to.latitude;
        let toY = to.longitude;
        return Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
    }
}

module.exports = InMemoryGeoTagStore