import { Controller, Get } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller()
export class DeviceController {
	constructor(private readonly deviceService: DeviceService) {}

	@Get('devices')
	getDevices() {
		return this.deviceService.getDevices();
	}

	@Get('register')
	registerDevice() {
		return this.deviceService.registerDevice({ name: 'Test' });
	}
}
