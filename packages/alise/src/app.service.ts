import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello() {
		return 'Hello';
	}

	postWebhook() {
		return {
			response: {
				text: 'Навык работает. УрА',
			},
			version: '1.0',
		};
	}
}
