import { EntityRepository, Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { SignupDto } from './dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signup(signupDto: SignupDto) {
    const { 
      password,
      firstname,
      lastname,
      speciality,
      tuition,
      username
     } = signupDto;

    const user = new User();
    user.username = username;
    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    user.dni = username;
    user.firstname = firstname;
    user.lastname = lastname;
    user.speciality = speciality;
    user.tuition = tuition;


    await user.save();
  }
}
