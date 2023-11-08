import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class BDI13 {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	items: number[];
}
