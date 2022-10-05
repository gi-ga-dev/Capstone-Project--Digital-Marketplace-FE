export interface IAuthSubmit {
    // Request (i dati matchano con UserDto)
    "firstName"?: string;
    "lastName"?: string;
    "email"?: string;
    // tramite username e password faccio la richiesta dei dati (token compreso)
    "username": string;
    "password": string;
}
