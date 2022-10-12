export interface IProdVideogame {

    // [proprieta' comuni]
    "id"?: number;
    "priceInitial": number; // prezzo iniziale memorizzato per calcolo
    "priceDiscounted"?: number;
    "discount"?: number;
    // if(isDiscounted)  --> priceDiscounted = priceInitial - (priceInitial/100*n)
    "title": string;
    "description": string;
    "platform": string; // dove e' possibile installarlo
    "publisher": string;
    "releaseDate": string;
    "language": string;
    "genre": string;
    "ratings"?: number; // 1-5 stars (average)
    "reviews"?: number;  // 1000 reviews 

    // [prop. videogames] --> solo schede tecniche (scrivero available for download at:)    
    "downloads"?: number;
    "uniqueCode": number;
    "vgSeries": string;
    "dlc"?: string;
    "developer": string;
    "ageRecommendation": number;
    "players": number;
    "coopPlay": string;
    "controllerSupport": string;
    "subtitles": string;
    "minResolution": number;
    "maxResolution": number; // 1080p
    "requiredSpace": number;
}
