export interface IProdMusic {
    // [proprieta' comuni]
    "id"?: number;
    "productType": string;
    "priceInitial": number; // lo scrivo nel campo di input alla creazione oggetto, serve per tenere memorizzato il prezzo iniziale nel caso di uno sconto
    "priceFinal": number; // priceFinal sara' quello sempre visualizzato, quando viene istanziato, e' = a priceInitial
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
    // [prop. music] --> downloaded from youtube
    "plays"?: number;
    "isrcCode": string; //12 digits alphanumeric
    "artist": string;
    "album": string;
    "duration": string;
}
