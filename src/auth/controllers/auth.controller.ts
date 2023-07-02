/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ErrorResponseMessage } from 'src/libs/constants/api';
import { User, UserDocument } from 'src/libs/database/schemas/user.schema';
import { BaseLogicException } from 'src/libs/exceptions/BaseLogicException';
import { JoiValidationPipe } from 'src/libs/pipes/joi-validation.pipe';
import { APIResponse } from 'src/libs/utils/api-response';
import { UserService } from 'src/user/services/user.service';
import { UserLoginDTO, userLoginValidation, UserRegisterDTO, userRegisterValidation } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: ModelType<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async signIn(@Body(new JoiValidationPipe(userLoginValidation)) body: UserLoginDTO): Promise<APIResponse<{ access_token: string }>> {
    const validationResult = await this.authService.validateUser(body.username, body.password);
    if (validationResult.success) {
      const accessToken = this.authService.generateAccessToken(validationResult.user);
      console.log(accessToken);
      
      return { success: true, access_token: accessToken }
    }
    throw new BaseLogicException({
      error_code: HttpStatus.UNAUTHORIZED,
      error_message: ErrorResponseMessage.UNAUTHORIZED,
    });
  }

  @Post('register')
  async register(@Body(new JoiValidationPipe(userRegisterValidation)) body: UserRegisterDTO): Promise<APIResponse<any>> {
    const duplicatedUser = await this.userModel.findOne({ username: body.username });
    if (duplicatedUser) {
      throw new BaseLogicException({
        error_code: HttpStatus.CONFLICT,
        error_message: ErrorResponseMessage.USERNAME_IS_ALREADY_EXISTED,
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;
    const user = await this.userModel.create(body);
    if (!user) {
      throw new BaseLogicException({
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        error_message: ErrorResponseMessage.CANNOT_CREATE_USER,
      })
    }
    return { success: true };
  }
}
