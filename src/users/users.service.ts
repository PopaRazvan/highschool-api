import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.findOne(email);

    if (user) {
      throw new HttpException('Account already exists', HttpStatus.BAD_REQUEST);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    this.userRepository.save(newUser);

    return { message: 'Account created successfully' };
  }

  async validateUser(loginUserDTO: LoginUserDto) {
    const { email, password } = loginUserDTO;

    const user = await this.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email, admin: user.admin };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findAll() {
    return this.userRepository.find({});
  }

  findOne(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...updateUserDto });
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
