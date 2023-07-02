/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User, UserDocument } from 'src/libs/database/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ConfigService } from '@nestjs/config';

type ValidateUserResult = {
  success: true;
  user: UserDocument;
} | {
  success: false;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: ModelType<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<ValidateUserResult> {
    const user = await this.userModel.findOne({ username }).select('+password');
    if (!user) {
      return { success: false };
    }
    const isHashMatch = await bcrypt.compare(password, user.password);
    return isHashMatch ? { success: true, user } : { success: false };
  }

  generateAccessToken(user: UserDocument): string {
    const payload = {
      user_id: user._id,
      username: user.username,
    };
    console.log(payload);
    return this.jwtService.sign(payload, { privateKey: this.configService.get<string>('jwt.secretKey') });
  }
}
