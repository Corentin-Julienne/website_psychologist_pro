import { ASRS } from "src/questionnaires/asrs_1_1/asrs.entity";
import { BDI13 } from "src/questionnaires/bdi13/bdi13.entity";
import { RAADS } from "src/questionnaires/raads/raads.entity";
import { STAIA } from "src/questionnaires/stai_y_a/stai_a.entity";
import { STAIB } from "src/questionnaires/stai_y_b/stai_b.entity";
import { TAS } from "src/questionnaires/tas_20/tas.entity";
import { UPPS } from "src/questionnaires/upps_p/upps.entity";
import { User } from "src/user/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EvalSession {

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, user => user.evalSessions)
	user: User;

	@OneToOne(() => ASRS, asrs => asrs.evalSession)
	@JoinColumn()
	asrs: ASRS;

	@OneToOne(() => BDI13, bdi13 => bdi13.evalSession)
	@JoinColumn()
	bdi13: BDI13;

	@OneToOne(() => RAADS, raads => raads.evalSession)
	@JoinColumn()
	raads: RAADS;

	@OneToOne(() => STAIA, staia => staia.evalSession)
	@JoinColumn()
	staiA: STAIA;

	@OneToOne(() => STAIB, staib => staib.evalSession)
	@JoinColumn()
	staiB: STAIB;

	@OneToOne(() => TAS, tas => tas.evalSession)
	@JoinColumn()
	tas: TAS;

	@OneToOne(() => UPPS, upps => upps.evalSession)
	@JoinColumn()
	upps: UPPS;
}