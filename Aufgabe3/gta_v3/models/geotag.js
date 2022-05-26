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
    #name = '';
    #longitude = '';
    #latitude = '';
    #hashtag = '';

    constructor(name, longitude, latitude, hashtag){
        this.#name = name;
        this.#longitude = longitude;
        this.latitude = latitude;
        this.hashtag = hashtag;
    }

    get name(){return this.#name;}
    set name(val){this.#name = val;}

    get longitude(){return this.#longitude;}
    set longitude(val){this.#longitude = val;}

    get latitude(){return this.#latitude;}
    set latitude(val){this.#latitude = val;}

    get hashtag(){return this.#hashtag;}
    set hashtag(val){this.#hashtag = val;}


    #name = '';
    #longitude = '';
    #latitude = '';
    #hashtag = '';

    constructor(name, longitude, latitude, hashtag){
        this.#name = name;
        this.#longitude = longitude;
        this.latitude = latitude;
        this.hashtag = hashtag;
    }

    get name(){return this.#name;}
    set name(val){this.#name = val;}

    get longitude(){return this.#longitude;}
    set longitude(val){this.#longitude = val;}

    get latitude(){return this.#latitude;}
    set latitude(val){this.#latitude = val;}

    get hashtag(){return this.#hashtag;}
    set hashtag(val){this.#hashtag = val;}


    // TODO: ... your code here ...
    
}

module.exports = GeoTag;
