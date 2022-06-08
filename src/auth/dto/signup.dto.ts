import { instanceToPlain } from 'class-transformer';


export class SignupDto {
  username: string;
  password: string;

  firstname: string;
  lastname: string;

  tuition: string;
  speciality: string;

  toJSON() {
    return instanceToPlain(this);
    }
}
