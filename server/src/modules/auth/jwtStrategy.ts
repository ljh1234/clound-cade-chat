import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/userEntity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export const jwtConstants = {
  secret: 'meiyoumima'
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  
  async validate(payload: User) {
    console.log('payload', payload)
    const user = this.userRepository.findOne({ where: { username: payload.username, password: payload.password }})
    console.log('jwtStrategy', user);
    if(!user) {
      return false;
    }

    return { username: payload.username, password: payload.password }
  }
}