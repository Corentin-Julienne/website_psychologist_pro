import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TAS {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	items: number[];
}
