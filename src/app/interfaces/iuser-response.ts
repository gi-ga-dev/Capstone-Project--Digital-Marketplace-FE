export interface IUserResponse {
    // dati che voglio far tornare nella pagina profilo
    // l'id lo utilizzo per riferirsi a quell'utente specifico
    "id": number;
    "firstName": string;
    "lastName": string;
    "email": string;
    "userName": string;
    "role": [];
    "password": string;
}
