import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UPPS {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	items: number[];
}
