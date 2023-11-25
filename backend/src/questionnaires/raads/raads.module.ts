import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RAADS } from "./raads.entity";
import { RAADSService } from './raads.service';
import { RAADSController } from './raads.controller';

@Module({
	imports: [TypeOrmModule.forFeature([RAADS])],
	providers: [RAADSService],
	controllers: [RAADSController]
})
export class RAADSModule {

}
