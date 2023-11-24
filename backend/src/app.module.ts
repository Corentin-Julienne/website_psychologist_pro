import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  	imports: [
		TypeOrmModule.forRoot({ // modify for prod (BIG SECURITY PROBLEM THERE)
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: '',
			password: '',
			database: '',
			entities: [

			],
			synchronize: true
		}),
		ConfigModule.forRoot({
			envFilePath: '.env' // check this
		})
  	],
  	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
