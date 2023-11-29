import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { ASRS } from './questionnaires/asrs_1_1/asrs.entity';
import { BDI13 } from './questionnaires/bdi13/bdi13.entity';
import { RAADS } from './questionnaires/raads/raads.entity';
import { STAIA } from './questionnaires/stai_y_a/stai_a.entity';
import { STAIB } from './questionnaires/stai_y_b/stai_b.entity';
import { TAS } from './questionnaires/tas_20/tas.entity';
import { UPPS } from './questionnaires/upps_p/upps.entity';
import { EvalSession } from './questionnaires/sessions/eval-session.entity';

@Module({
  	imports: [
		TypeOrmModule.forRoot({ 
			type: 'postgres',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT, 10),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [
				User,
				EvalSession,
				ASRS,
				BDI13,
				RAADS,
				STAIA,
				STAIB,
				TAS,
				UPPS
			],
			synchronize: true // switch to migration in prod
		}),
		ConfigModule.forRoot({
			envFilePath: '.env' // check this
		})
  	],
  	controllers: [AppController],
  	providers: [AppService],
})
export class AppModule {}
