import { ASRS } from "../asrs_1_1/asrs.entity";
import { BDI13 } from "../bdi13/bdi13.entity";
import { RAADS } from "../raads/raads.entity";
import { STAIA } from "../stai_y_a/stai_a.entity";
import { STAIB } from "../stai_y_b/stai_b.entity";
import { TAS } from "../tas_20/tas.entity";
import { UPPS } from "../upps_p/upps.entity";
import { User } from "../../user/user.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EvalSession {

	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(() => User, user => user.evalSessions)
	user: User;

	@OneToOne(() => ASRS, asrs => asrs.evalSession, { cascade: ['remove'] })
	@JoinColumn()
	asrs: ASRS;

	@OneToOne(() => BDI13, bdi13 => bdi13.evalSession, { cascade: ['remove'] })
	@JoinColumn()
	bdi13: BDI13;

	@OneToOne(() => RAADS, raads => raads.evalSession, { cascade: ['remove'] })
	@JoinColumn()
	raads: RAADS;

	@OneToOne(() => STAIA, staia => staia.evalSession, { cascade: ['remove'] })
	@JoinColumn()
	staiA: STAIA;

	@OneToOne(() => STAIB, staib => staib.evalSession, { cascade: ['remove'] })
	@JoinColumn()
	staiB: STAIB;

	@OneToOne(() => TAS, tas => tas.evalSession, { cascade: ['remove'] })
	@JoinColumn()
	tas: TAS;

	@OneToOne(() => UPPS, upps => upps.evalSession, { cascade: ['remove'] })
	@JoinColumn()
	upps: UPPS;
}
