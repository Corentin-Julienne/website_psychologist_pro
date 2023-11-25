import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { EvalSession } from '../sessions/eval-sessions.entity';

@Entity()
export class TAS {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	items: number[];

	@OneToOne(() => EvalSession, evalSession => evalSession.tas)
	evalSession: EvalSession;
}
