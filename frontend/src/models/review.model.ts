export interface Client {
    fname: string,
    lname: string,
    profil: string,
}


export interface Review {
    id: string,
    artisan_id: string,
    Contenu: string,
    etoile: number,
    client?: Client,
    artisan?: Client,
}