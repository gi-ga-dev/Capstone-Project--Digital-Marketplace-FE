export interface IAuthCredentialsRequest {
    // [Request] con tutti e 5 i campi [UserDtoRegister] --> POST dati per invio Request di inviare dati nel db 
    // nessuna [Response] - Register page -
    "firstName"?: string;
    "lastName"?: string;
    "email"?: string;
    // [Request] con cred. username/pass [LoginRequest] --> POST dati per invio Request, per ricevere in   
    // [Response] i dati compreso token [JwtResponse] - Login Page -
    "userName": string;
    "password": string;
}
