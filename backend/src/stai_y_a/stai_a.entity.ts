import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class STAIA {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	items: number[];
}
