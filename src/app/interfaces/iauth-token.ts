export interface IAuthToken {
    // Response (i dati matchano con JwtResponse)
    "token": string;
    "type"?: string;
    "id"?: number;
    "userName"?: string;
    "roles"?: [];
}
