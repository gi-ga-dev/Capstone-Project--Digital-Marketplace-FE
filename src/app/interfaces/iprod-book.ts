export interface IProdBook {
    // [proprieta' comuni]
    "id"?: number;
    "paymentMethod"?: string;
    "imgLink": string;
    "productType": string;
    "price": number;
    //"priceMemorized"?: number;
    //"discount"?: number;
    "title": string;
    "description": string;
    "platform": string;
    "publisher": string;
    "releaseDate": Date;
    "language": string;
    "genre": string;
    //"ratings"?: number; // 1-5 stars (average)
    //"reviews"?: number;  // 1000 reviews 

    // [prop. books] --> downloaded pdf
    //"read"?: number; // quante volte e' stato letto
    "pages": number;
    "isbnCode": string;
    "bookSeries": string;
    "author": string;
}
