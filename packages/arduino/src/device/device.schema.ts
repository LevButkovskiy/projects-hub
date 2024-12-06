import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Device {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column()
	name: string;
}
