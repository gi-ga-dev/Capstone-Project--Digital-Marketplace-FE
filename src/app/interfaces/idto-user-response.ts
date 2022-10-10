export interface IUserDtoGetResponse {
    // [Response] del get/getAll dati users da far tornare nella pagina profilo
    // l'id lo utilizzo per riferirsi a quell'utente specifico    
    "id": number;
    "firstName": string;
    "lastName": string;
    "email": string;
    "userName": string;
    "role": string;

    "accountBalance": number;
    "isSubscribed": boolean;
    "subStart": string;
    "subEnd": string;
    "subTotalTime": number;
    "subRemaining": number;
    "purchaseHistory": [];
    "videogamesList": [];
    "musicList": [];
    "bookList": [];
}
