import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';
import { AuthJwtPayload } from 'src/types/auth-jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}
  async registerUser(createUserDTO: CreateUserDTO) {
    const isUserExists = await this.userService.findByEmail(
      createUserDTO.email,
    );

    if (isUserExists) {
      throw new ConflictException('Your email is already in use');
    }
    return await this.userService.create(createUserDTO);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatched = verify(user.password, password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }

  async login(userId: number, username: number, role: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const hashedRT = await hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRT);

    return {
      id: userId,
      name: username,
      accessToken,
      refreshToken,
      role: role,
    };
  }

  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };

    console.log(this.refreshTokenConfig);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findUser(userId);
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
    const currentUser = { id: user.id, role: user.role };
    return currentUser;
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findUser(userId);

    // const refreshTokenMatched = await verify(
    //   user.hashedRefreshToken,
    //   refreshToken,
    // );

    // if (!refreshTokenMatched) {
    //   throw new UnauthorizedException('Invalid Refresh Token!');
    // }
    const currentUser = { id: user.id };
    return currentUser;
  }

  async refreshToken(userId: number) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRT = await hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRT);
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateGoogleUser(googleUser: CreateUserDTO) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) {
      return user;
    }
    return await this.userService.create(googleUser);
  }

  async signOut(userId: number) {
    return await this.userService.updateHashedRefreshToken(userId, null);
  }
}
