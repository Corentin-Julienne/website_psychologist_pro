import { EvalSession } from "src/questionnaires/sessions/eval-sessions.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity()
export class STAIB {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	items: number[];

	@OneToOne(() => EvalSession, evalSession => evalSession.staiB)
	evalSession: EvalSession;
}
