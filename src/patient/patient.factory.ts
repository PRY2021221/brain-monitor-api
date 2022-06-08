import { User } from "src/auth/entities/user.entity";
import { CreatePatientDto } from "./patient.dto";
import { Patient } from "./patient.entity";

export class PatientFactory {
    public static convertCreateDtoToEntity(createPatientDto: CreatePatientDto, doctorId: number): Patient{
        const patient = new Patient();
        patient.address = createPatientDto.address;
        patient.birthDate = createPatientDto.birthDate;
        patient.dni = createPatientDto.dni;
        patient.email = createPatientDto.email;
        patient.firstLastname = createPatientDto.firstLastname;
        patient.firstname = createPatientDto.firstname;
        patient.hospitalName = createPatientDto.hospitalName;
        patient.phoneNumber = createPatientDto.phoneNumber;
        patient.registeredDate = createPatientDto.registeredDate;
        patient.ubigeo = createPatientDto.ubigeo;
        patient.secondLastname = createPatientDto.secondLastname;
        patient.gender = createPatientDto.gender;
        
        
        const doctor = new User();
        doctor.id = doctorId;
        patient.doctor = doctor;

        return patient;
    }
}