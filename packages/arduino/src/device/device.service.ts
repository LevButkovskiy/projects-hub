import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.schema';

@Injectable()
export class DeviceService {
	constructor(
		@InjectRepository(Device)
		private readonly devicesRepository: Repository<Device>,
	) {}

	async getDevices() {
		return this.devicesRepository.find();
	}

	async registerDevice({ name }: { name: string }) {
		const device = this.devicesRepository.create({ name });
		return this.devicesRepository.save(device);
	}
}
