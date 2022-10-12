export interface IProdMusic {
    // [proprieta' comuni]
    "id"?: number;
    "priceInitial": number; // prezzo iniziale memorizzato per calcolo
    "priceActual": number; // prezzo base visualizzato 
    "discount"?: number;
    // if(discounted)  --> priceActual = priceInitial - (priceInitial/100*n)
    // if(!discounted) --> priceActual = priceInitial;
    "title": string;
    "description": string;
    "platform": string; // dove e' possibile installarlo
    "publisher": string;
    "releaseDate": string;
    "language": string;
    "genre": string;
    "ratings"?: number; // 1-5 stars (average)
    "reviews"?: number;  // 1000 reviews 
    // [prop. music] --> downloaded from youtube
    "plays"?: number;
    "isrcCode": string; //12 digits alphanumeric
    "artist": string;
    "album": string;
    "duration": string;
}
