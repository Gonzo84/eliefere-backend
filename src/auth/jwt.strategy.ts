import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import { Client } from '../models/users/client.entity';
import { configService } from '../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getConf().jwt.secretOrKey,
    });
  }

  // TODO implement strategy to validate both users and partners
  async validate(payload: JwtPayload): Promise<Client> {
    const client = await this.authService.validateClient(payload);
    if (!client) {
      throw new UnauthorizedException();
    }
    return client;
  }
}
