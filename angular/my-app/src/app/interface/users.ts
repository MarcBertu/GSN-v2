export interface Users {
    idUser: number,
    type: number,
    lastname: string,
    firstname: string,
    email: string,
    phone: number,
    fax: number | undefined,
    birthDate: Date | undefined,
    siren: string | undefined,
    siret : string | undefined,
    isVerified: number | undefined
}
