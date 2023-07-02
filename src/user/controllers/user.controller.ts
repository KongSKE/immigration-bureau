/* eslint-disable prettier/prettier */
import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser, UserGuard } from 'src/auth/guards/user.guard';
import { ErrorResponseMessage } from 'src/libs/constants/api';
import { UserDocument } from 'src/libs/database/schemas/user.schema';
import { BaseLogicException } from 'src/libs/exceptions/BaseLogicException';
import { APIResponse } from 'src/libs/utils/api-response';
import { UserService } from '../services/user.service';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(UserGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@Req() req: RequestWithUser): Promise<APIResponse<{ user: UserDocument }>> {
    const user = await this.userService.findUserById(req.user._id);
    if (!user) {
      throw new BaseLogicException({
        error_code: HttpStatus.NOT_FOUND,
        error_message: ErrorResponseMessage.USER_WAS_NOT_FOUND,
      });
    }
    return { success: true, user };
  }
}
