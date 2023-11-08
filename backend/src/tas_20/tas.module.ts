import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TAS } from './tas.entity';
import { TASService } from './tas.service';
import { TASController } from './tas.controller';

@Module({
	imports: [TypeOrmModule.forFeature([TAS])],
	providers: [TASService],
	controllers: [TASController]
})
export class TASModule {

}
