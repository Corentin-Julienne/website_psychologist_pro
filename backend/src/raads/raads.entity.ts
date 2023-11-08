import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RAADS {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	items: number[];
}
