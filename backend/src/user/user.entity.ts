import { EvalSession } from "src/questionnaires/sessions/eval-sessions.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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

	@OneToMany(() => EvalSession, evalSession => evalSession.user)
	evalSessions: EvalSession[];
}
