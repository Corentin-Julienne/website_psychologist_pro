import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UPPS } from "./upps.entity";
import { UPPSService } from './upps.service';
import { UPPSController } from './upps.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UPPS])],
	providers: [UPPSService],
	controllers: [UPPSController]
})
export class UPPSModule {

}
