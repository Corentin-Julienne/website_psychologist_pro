import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { STAIB } from './stai_b.entity';

@Module({
	imports: [TypeOrmModule.forFeature([STAIB])],
	providers: [],
	controllers: []
})
export class STAIBModule {

}
