import { HttpException, HttpStatus } from '@nestjs/common';

type Response = { error_code: HttpStatus; error_message: string };

export class BaseLogicException extends HttpException {
  constructor(response: Response) {
    super(response, HttpStatus.OK);
  }

  getResponse() {
    return super.getResponse() as Response;
  }
}
