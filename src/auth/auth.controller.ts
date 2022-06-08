/* eslint-disable no-param-reassign */
import {
  Body, Controller,
  Get,
  HttpCode, HttpStatus, Post, Req, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomLoggerService } from '../logger/custom-logger.service';
import { AuthService } from './auth.service';
import {
  SigninDto, SignupDto, RefreshTokenDto,
} from './dto';
import { IReqWithToken } from './req-with-token.interface';

@Controller('auth')
export class AuthController {
  constructor(
        private readonly _authService : AuthService,
        private readonly logger: CustomLoggerService,
  ) {
    this.logger = new CustomLoggerService(AuthController.name);
  }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto): Promise<void> {
    this.logger.debug(`Calling signup with ${JSON.stringify(signupDto)}`);
    this.logger.log('Calling Service Method signup');
    await this._authService.signup(signupDto);
  }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() signinDto: SigninDto) {
      this.logger.debug(`Calling signin with ${JSON.stringify(signinDto)}`);
      this.logger.log('Calling Service Method signin');
      const response = await this._authService.signin(signinDto);

      return response;
    }

    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
      this.logger.log(`Calling refresh-token with body: ${JSON.stringify(refreshTokenDto)}`);

      const refreshResponse = await this._authService.refreshToken(refreshTokenDto);
      this.logger.debug(`Returning refresh token : ${JSON.stringify(refreshResponse)}`);

      return refreshResponse;
    }

    @Get('user-info')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard())
    async getUserTokenInfo(@Req() req: IReqWithToken){
      return req.user;
    }
}
