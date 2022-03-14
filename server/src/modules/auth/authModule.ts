import { Module } from '@nestjs/common';
import { AuthService } from './authService';
import { LocalStrategy } from './localStrategy';
import { JwtStrategy, jwtConstants } from './jwtStrategy';
// import { UserModule } from 'src/modules/user/userModule'
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entity/userEntity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' }, // token 过期时效
    }),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}