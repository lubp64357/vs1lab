// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
 class GeoTag {
    #name = "";
    #latitude = 0;
    #longitude = 0;
    #hashtag = "";

    constructor(name, latitude, longitude, hashtag) {
        this.#name = name;
        this.#latitude = latitude;
        this.#longitude = longitude;
        this.#hashtag = hashtag;
    }
    
    /*In JavaScript, the JSON. stringify() function looks for functions named toJSON 
    in the object being serialized. If an object has a toJSON function, JSON. stringify() calls toJSON() 
    and serializes the return value from toJSON() instead.*/
    toJSON() {
        return {
            name: this.#name,
            latitude: this.#latitude,
            longitude: this.#longitude
        }
    }

    get name() {
        return this.#name;
    }


    get latitude() {
        return this.#latitude;
    }


    get longitude() {
        return this.#longitude;
    }


    get hashtag() {
        return this.#hashtag;
    }

}

module.exports = GeoTag;