import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signIn(loginUserDTO: LoginUserDto) {
    return this.usersService.validateUser(loginUserDTO);
  }

  signUp(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await this.jwtService.verify(token);
      return { message: 'Token is valid', decodedToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
