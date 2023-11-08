import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class STAIB {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	items: number[];
}
