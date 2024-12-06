import { IYandexTypeValue } from './yandex.type';

export enum EAliceDialogRequestType {
	/**
	 * Голосовой ввод
	 */
	'SimpleUtterance' = 'SimpleUtterance',
	/**
	 * Нажатие кнопки
	 */
	'ButtonPressed' = 'ButtonPressed',
	/**
	 * Событие начала воспроизведения аудиоплеером на умных колонках.
	 */
	'AudioPlayerPlaybackStarted' = 'AudioPlayer.PlaybackStarted',

	/**
	 * Событие завершения воспроизведения
	 */
	'AudioPlayerPlaybackFinished' = 'AudioPlayer.PlaybackFinished',

	/**
	 * Cобытие о скором завершении воспроизведения текущего трека
	 */
	'AudioPlayerPlaybackNearlyFinished' = 'AudioPlayer.PlaybackNearlyFinished',

	/**
	 * Остановка воспроизведения
	 */
	'AudioPlayerPlaybackStopped' = 'AudioPlayer.PlaybackStopped',

	/**
	 * Ошибка воспроизведения
	 */
	'AudioPlayerPlaybackFailed' = 'AudioPlayer.PlaybackFailed',

	/**
	 * Запрос на подтверждение оплаты в навыке.
	 */
	'PurchaseConfirmation' = 'Purchase.Confirmation',

	/**
	 * Запрос на чтение данных для шоу
	 */
	'ShowPull' = 'Show.Pull',
}

export type TAliceDialogMetaInterfaces = {
	/**
	 * Пользователь может видеть ответ навыка на экране и открывать ссылки в браузере.
	 */
	screen: Record<string, unknown>;

	/**
	 * У пользователя есть возможность запросить связку аккаунтов.
	 */
	account_linking: Record<string, unknown>;

	/**
	 * На устройстве пользователя есть аудиоплеер.
	 */
	audio_player: Record<string, unknown>;
};

export type TAliceDialogMeta = {
	/**
	 * Язык в POSIX-формате, максимум 64 символа.
	 */
	locale: string;

	/**
	 * Название часового пояса, включая алиасы, максимум 64 символа.s
	 */
	timezone: string;

	/**
	 * Не рекомендуется к использованию. Интерфейсы, доступные на клиентском устройстве, перечислены в свойстве interfaces.
	 */
	client_id: string;

	/**
	 * Интерфейсы, доступные на устройстве пользователя.
	 */
	interfaces: TAliceDialogMetaInterfaces;
};

export type TAliceDialogBaseRequest = {
	type: Exclude<
		EAliceDialogRequestType,
		EAliceDialogRequestType.SimpleUtterance
	>;
};
export type TAliceDialogSimpleUtteranceRequest = {
	type: EAliceDialogRequestType.SimpleUtterance;

	/**
     * Нормализованный текст запроса

     */
	command: string;

	/**
	 * Полный текст пользовательского запроса, максимум 1024 символа.
	 */
	original_utterance: string;

	/**
	 * Формальные характеристики реплики, которые удалось выделить Яндекс Диалогам. Свойство отсутствует, если ни одно из вложенных свойств не применимо.
	 */
	markup: {
		/**
		 * Признак реплики, которая содержит криминальный подтекс
		 */
		dangerous_context: boolean;
	};

	/**
	 * Слова и именованные сущности, которые Диалоги извлекли из запроса пользователя.
	 */
	nlu: {
		/**
		 * Массив слов из произнесенной пользователем фразы.
		 */
		tokens: string[];

		/**
		 * Массив именованных сущностей.
		 */
		entities: ({
			tokens: {
				/**
				 * Первое слово именованной сущности.
				 */
				start: number;

				/**
				 * Первое слово после именованной сущности.
				 */
				end: number;
			};
		} & IYandexTypeValue)[];
	};
};

export type TAliceDialogRequest =
	| TAliceDialogBaseRequest
	| TAliceDialogSimpleUtteranceRequest;

export type TAliceDialogSessionUser = {
	/**
	 * Идентификатор пользователя Яндекса, единый для всех приложений и устройств.
	 */
	user_id: string;

	/**
	 * Токен для OAuth-авторизации, который также передается в заголовке Authorization для навыков с настроенной связкой аккаунтов.
	 */
	access_token: string;
};

export type TAliceDialogSessionApplication = {
	/**
	 * Идентификатор экземпляра приложения, в котором пользователь общается с Алисой, максимум 64 символа.
	 */
	application_id: string;
};

export type TAliceDialogSession = {
	/**
	 * Уникальный идентификатор сессии, максимум 64 символа.
	 */
	session_id: string;

	/**
	 * Идентификатор сообщения в рамках сессии, максимум 8 символов. Инкрементируется с каждым следующим запросом.
	 */
	message_id: number;

	/**
	 * Идентификатор вызываемого навыка, присвоенный при создании.
	 */
	skill_id: string;

	/**
	 * @deprecated Свойство не поддерживается — вместо него следует использовать новое, полностью аналогичное свойство session.application.application_id.
	 * @description Идентификатор экземпляра приложения, в котором пользователь общается с Алисой, максимум 64 символа.
	 */
	user_id: string;

	/**
	 * Атрибуты пользователя Яндекса, который взаимодействует с навыком. Если пользователь не авторизован в приложении, свойства user в запросе не будет.
	 */
	user?: TAliceDialogSessionUser;

	/**
	 * Данные о приложении, с помощью которого пользователь взаимодействует с навыком.
	 */
	application: TAliceDialogSessionApplication;

	/**
	 * Признак новой сессии. Возможные значения:
	 * - true - пользователь начинает новый разговор с навыком;
	 * - false - запрос отправлен в рамках уже начатого разговора.
	 */
	new: boolean;
};

export type TAliceDialogState = {
	/**
	 * Состояние навыка в контексте сессии.
	 */
	session: {
		value: number;
	};

	/**
	 * Состояние навыка в контексте авторизованного пользователя.
	 */
	user: {
		value: number;
	};

	/**
	 * Состояние навыка в контексте авторизованного пользователя.
	 */
	application: {
		value: number;
	};
};

export type TAliceDialogBody = {
	/**
	 * Информация об устройстве, с помощью которого пользователь разговаривает с Алисой.
	 */
	meta: TAliceDialogMeta;

	/**
	 * Данные, полученные от пользователя.
	 */
	request: TAliceDialogRequest;

	/**
	 * Данные о сессии. Сессия — это период относительно непрерывного взаимодействия пользователя с навыком.
	 *
	 * Сессия завершается, когда:
	 * - пользователь запрашивает выход из навыка;
	 * - навык явно завершает работу ("end_session": true);
	 * - от пользователя долго не поступает команд (тайм-аут зависит от поверхности, минимум несколько минут).
	 */
	session: TAliceDialogSession;

	/**
	 * Данные о сохраненном состоянии.
	 */
	state: TAliceDialogState;

	/**
	 * Версия протокола.
	 */
	version: string;
};
