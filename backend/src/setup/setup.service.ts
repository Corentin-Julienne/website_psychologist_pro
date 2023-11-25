import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SetupService implements OnModuleInit {

	constructor (
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private configService: ConfigService,
		private authService: AuthService
	) {};
	
	async onModuleInit() {
		await this.initializeAdminUser();
	}

	// create an admin user when not present in DB
	async initializeAdminUser() : Promise<void> {
		const existingAdmin = this.userRepository.findOne( { where: { role: 'admin' } } );

		if (!existingAdmin) {
			// creating a default hashed password
			const defaultAdminPassword = this.configService.get<string>('DEFAULT_ADMIN_PASSWORD');
			const hashedAdminPassword = await this.authService.createHashedPassword(defaultAdminPassword);
			// then create admin in db, with the associated password
			const adminUser = new User();

			adminUser.role = 'admin',
			adminUser.username = this.configService.get<string>('DEFAULT_ADMIN_USERNAME');
			adminUser.password = hashedAdminPassword;
			adminUser.two_fa_key = null;

			await this.userRepository.save(adminUser);
		}
	}

	// create a function that seed fake users for dev and testing 
	async seedFakeUsersWithData() : Promise<void> {
		// implement that or use faker
	}
}
