import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { STAIA } from './stai_a.entity';
import { STAIAService } from './stai_a.service';
import { STAIAController } from './stai_a.controller';

@Module({
	imports: [TypeOrmModule.forFeature([STAIA])],
	providers: [STAIAService],
	controllers: [STAIAController]
})
export class STAIAModule {

}
