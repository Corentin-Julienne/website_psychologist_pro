import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { EvalSession } from '../sessions/eval-sessions.entity';

@Entity()
export class BDI13 {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	items: number[];

	@OneToOne(() => EvalSession, evalSession => evalSession.bdi13)
	evalSession: EvalSession;
}
