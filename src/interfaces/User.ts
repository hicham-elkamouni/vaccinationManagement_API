export interface RegisterUser {
    cin: string;
    address: string;
    fName: string;
    lName: string;
    city: string;
    nbrPhone: number;
    shotTaken: number;
    diseaseOrTreatments?: string;
    sideEffects1stVaccine?: string;
    sideEffects2stVaccine?: string;
}