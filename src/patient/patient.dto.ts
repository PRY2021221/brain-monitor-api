import { Gender } from "./patient.entity";


export class CreatePatientDto {
      firstname: string;
      
      firstLastname: string;
    
      secondLastname: string;
    
      registeredDate: Date;

      birthDate: Date;
    
      hospitalName: string;
    
      dni: string;
    
      phoneNumber: string;
    
      email: string;
    
      ubigeo: string;
    
      address: string;

      gender: Gender;
  }
  