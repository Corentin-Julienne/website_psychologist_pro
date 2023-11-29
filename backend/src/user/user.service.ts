import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from 'typeorm';
import { User } from "./user.entity";
import { UpdateAdminDto } from './update-admin.dto';
import { CreateUserDto } from './create-user.dto';
import { EvalSessionService } from '../questionnaires/sessions/eval-session.service';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private dataSource: DataSource,
		private evalSessionService: EvalSessionService
	) {};

	findAll() : Promise<User[]> {
		return this.userRepository.find();
	}

	async createStandardUser(createUserDto: CreateUserDto) {
		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const user: User = this.userRepository.create(createUserDto);
			user.password = null;
			user.two_fa_key = null;
			user.role = 'patient';
			user.username = this.generatePatientUsername();

			await queryRunner.manager.save(user);
			await this.evalSessionService.createEvalSession(user.id, createUserDto.evalSessionDto, queryRunner);
			
			await queryRunner.commitTransaction();
		} catch (err) {
			await queryRunner.rollbackTransaction();
			console.log('error in transaction : rollback');
		} finally {
			await queryRunner.release();
		}
	}

	private generatePatientUsername() : string { // implement that
		return 'to implement';
	}

	async updateUserUsername(userId: number, updateAdminDto: UpdateAdminDto) : Promise<User | undefined> {
		const user: User = await this.userRepository.findOne({
			where: { id: userId }
		});
		if (!user) {
			throw new NotFoundException('user not found');
		}
		if (user.role !== 'admin') {
			throw new UnauthorizedException('only admin users can change their usernames');
		}

		Object.assign(user, updateAdminDto);
		return this.userRepository.save(user);
	}

	async destroyUser(userId: number) : Promise<void> {
		const user: User = await this.userRepository.findOne({
			where: { id: userId }
		});

		if (!user) {
			throw new NotFoundException('user not found');
		}
		if (user.role === 'admin') {
			throw new UnauthorizedException('only non admin users can be deleted');
		}

		await this.userRepository.delete(userId);
	}
}
