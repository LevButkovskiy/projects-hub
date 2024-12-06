import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TAliceDialogBody } from './types/dialog.type';

@Controller('alise')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('hello')
	getHello() {
		return this.appService.getHello();
	}

	@Post('webhook')
	postWebhook(@Body() body: TAliceDialogBody) {
		console.log(body);
		return this.appService.postWebhook(body);
	}
}
