import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceModule } from './device/device.module';
import { Device } from './device/device.schema';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'postgres',
			port: 5432,
			username: 'admin',
			password: 'admin',
			database: 'postgres',
			entities: [Device],
			synchronize: true,
		}),

		DeviceModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
