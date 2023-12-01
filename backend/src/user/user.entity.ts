import { EvalSession } from "../questionnaires/sessions/eval-session.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	two_fa_key: string;

	@Column()
	role: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(() => EvalSession, evalSession => evalSession.user, { cascade: ['remove'] })
	evalSessions: EvalSession[];
}
