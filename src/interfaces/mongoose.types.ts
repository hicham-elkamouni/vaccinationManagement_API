import { Document } from "mongoose";

export interface IUser extends Document {
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
export interface IManager extends Document {
  fName : string;
  lName : string;
  area : string;
}
