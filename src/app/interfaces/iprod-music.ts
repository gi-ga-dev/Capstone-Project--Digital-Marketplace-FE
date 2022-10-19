export interface IProdMusic {
    // [proprieta' comuni]
    "id"?: number;
    "imgLink": string;
    "productType": string;
    "price": number;
    "priceMemorized"?: number;
    "discount"?: number;
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
    "artist": string;
    "album": string;
    "duration": string;
}
