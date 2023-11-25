import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ASRS } from "./asrs.entity";
import { ASRSService } from './asrs.service';
import { ASRSController } from './asrs.controller';

@Module({
	imports: [TypeOrmModule.forFeature([ASRS])],
	providers: [ASRSService],
	controllers: [ASRSController]
})
export class ASRSModule {
	
}
