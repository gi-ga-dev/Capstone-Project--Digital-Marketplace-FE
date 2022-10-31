export interface IProdVideogame {
    // [proprieta' comuni]
    "id"?: number;
    "paymentMethod"?: string;
    "imgLink": string;
    "productType": string;
    "price": number;
    "priceMemorized"?: number;
    "discount"?: number;
    "title": string;
    "description": string;
    "platform": string;
    "publisher": string;
    "releaseDate": string;
    "language": string;
    "genre": string;
    "ratings"?: number; // 1-5 stars (average)
    "reviews"?: number;  // 1000 reviews 

    // [prop. videogames]
    downloadCode: any; // obj
    "downloads"?: number;
    "vgSeries": string;
    "dlc"?: string;
    "developer": string;
    "ageRecommendation": number;
    "players": number;
    "coopPlay": string;
    "controllerSupport": string;
    "subtitles": string;
    "requiredSpace": number;
}
