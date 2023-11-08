import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ASRS {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	items: number[];
}
