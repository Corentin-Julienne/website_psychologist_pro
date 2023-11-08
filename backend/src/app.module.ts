import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
		})
  	],
  	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
