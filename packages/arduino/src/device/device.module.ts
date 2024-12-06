import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from './device.controller';
import { Device } from './device.schema';
import { DeviceService } from './device.service';

@Module({
	imports: [TypeOrmModule.forFeature([Device])],
	controllers: [DeviceController],
	providers: [DeviceService],
})
export class DeviceModule {}
