export interface Reclamation {
    id: string,
    sujet: string,
    description:  string,
    statut: string,
    utilisateur_id?: number,
    created_at?: Date,
}