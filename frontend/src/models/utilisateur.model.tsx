export interface Utilisateur {
    id: string,
    fname: string,
    lname: string,
    telephone: string,
    adresse: string,
    ville: string,
    profil: string,
    email: string,
    password: string,
    category_id?: string,
    role: string,
    gates?: string[]
}