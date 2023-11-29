import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BDI13Controller } from "./bdi13.controller";
import { BDI13 } from "./bdi13.entity";
import { BDI13Service } from './bdi13.service';

@Module({
	imports: [TypeOrmModule.forFeature([BDI13])],
	providers: [BDI13Service],
	controllers: [BDI13Controller]
})
export class BDI13Module {
	
}
