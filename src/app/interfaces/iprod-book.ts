export interface IProdBook {
    // [proprieta' comuni]
    "id"?: number;
    "priceInitial": number; // prezzo iniziale memorizzato per calcolo
    "priceDiscounted"?: number; // prezzo base visualizzato 
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
    // [prop. books] --> downloaded pdf
    "read"?: number; // quante volte e' stato letto
    "isbnCode": number; // 10-13 digits numbers
    "bookSeries": string;
    "author": string;
}
