/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Request } from 'express';
import { User, UserDocument } from 'src/libs/database/schemas/user.schema';

export type RequestWithUser = {
  req: Request,
  user?: any,
}

export class UserGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userModel: ModelType<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validate(req: Request & { user?: any }) {
    const jwtFromHeader = req.headers.authorization?.replace('Bearer', '').trim() ?? 'invalid';
    try {
      const payload = await this.jwtService.verifyAsync(jwtFromHeader, { secret: this.configService.get<string>('jwt.secretKey') });
      const user = await this.userModel.findById(payload.user_id);
      if (!user) throw new UnauthorizedException();
      req.user = { _id: user._id };
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async canActivate(context: ExecutionContext) {
    const [req] = context.getArgs();
    const result = await this.validate(req);
    return result;
  }
}
