import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { EvalSession } from '../sessions/eval-sessions.entity';

@Entity()
export class RAADS {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	items: number[];

	@OneToOne(() => EvalSession, evalSession => evalSession.raads)
	evalSession: EvalSession;
}
