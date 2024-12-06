import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('alise')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('hello')
	getHello() {
		return this.appService.getHello();
	}

	@Post('webhook')
	postWebhook(body) {
		console.log(body);
		return this.appService.postWebhook();
	}
}
