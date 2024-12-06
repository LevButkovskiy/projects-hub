import { Injectable } from '@nestjs/common';
import { EAliceDialogRequestType, TAliceDialogBody } from './types/dialog.type';

@Injectable()
export class AppService {
	getHello() {
		return 'Hello';
	}

	postWebhook(body: TAliceDialogBody) {
		console.log(JSON.stringify(body, null, 2));

		if (body.request.type === EAliceDialogRequestType.SimpleUtterance) {
			return {
				response: {
					text: 'сейчас я буду кушать, сейчас меня покормят',
				},
				version: '1.0',
			};
		}

		return {
			response: {
				text: 'Извините, такое я не умею',
			},
			version: '1.0',
		};
	}
}
