// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class representing example geoTags at HKA
 * 
 * TODO: populate your InMemoryGeoTagStore with these tags
 * 
 */
 class GeoTagExamples {
    /**
     * Provides some geoTag data
*/
    static get tagList() {
        return [
        {name:'Castle', latitude: 49.013790, longitude:8.404435,hashtag:'sight'},
            {name:'IWI', latitude: 49.013790, longitude:8.404435,hashtag:'edu'},
            {name:'Building E',latitude: 49.014993,longitude: 8.390049, hashtag:'#campus'},
            {name:'Building F', latitude:49.015608, longitude:8.390112, hashtag:'#campus'},
            {name:'Building M',latitude: 49.016171, longitude:8.390155, hashtag:'#campus'},
            {name:'Building LI',latitude: 49.015636,longitude: 8.389318, hashtag:'#campus'},
            {name:'Auditorium He',latitude: 49.014915,longitude: 8.389264, hashtag:'#campus'},
            {name:'Building R', latitude:49.014992,longitude: 8.392365, hashtag:'#campus'},
            {name:'Building A', latitude:49.015738, longitude:8.391619, hashtag:'#campus'},
            {name:'Building B', latitude:49.016843, longitude:8.391372, hashtag:'#campus'},
            {name:'Building K',latitude: 49.013190, longitude:8.392090, hashtag:'#campus'},
        ];
    }
}

module.exports = GeoTagExamples;