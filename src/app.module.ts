import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CountryModule } from './country/country.module';
import { UserModule } from './user/user.module';
import configuration from './libs/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // H6HeTV8GzWwkeUrl
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: `${configService.get<string>('mongodb.url')}`,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    CountryModule,
  ],
})
export class AppModule {}
