import { Module } from "@nestjs/common";
import { SetupService } from './setup.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule
	],
	providers: [
		SetupService
	],
	controllers: [

	]
})
export class SetupModule {

}
