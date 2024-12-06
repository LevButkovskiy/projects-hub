export enum EYandexType {
	/**
	 * дата и время, абсолютные или относительные.
	 */
	DATETIME = 'YANDEX.DATETIME',

	/**
	 * фамилия, имя и отчество.
	 */
	FIO = 'YANDEX.FIO',

	/**
	 * местоположение (адрес или аэропорт).
	 */
	GEO = 'YANDEX.GEO',

	/**
	 * число, целое или с плавающей точкой.
	 */
	NUMBER = 'YANDEX.NUMBER',
}

export interface IYandexTypeValueBase<
	Type extends EYandexType,
	Value extends number | Record<string, unknown>,
> {
	/**
	 * Тип именованной сущности. Возможные значения:
	 */
	type: Type;

	/**
	 * Формальное описание именованной сущности.
	 */
	value: Value;
}

export interface IYandexTypeValueDateTime
	extends IYandexTypeValueBase<
		EYandexType.DATETIME,
		{ day: number; day_is_relative: number }
	> {}

export interface IYandexTypeFio
	extends IYandexTypeValueBase<
		EYandexType.FIO,
		{
			first_name: string;
			last_name: string;
		}
	> {}

export interface IYandexTypeNumber
	extends IYandexTypeValueBase<EYandexType.NUMBER, number> {}

export interface IYandexTypeGeo
	extends IYandexTypeValueBase<
		EYandexType.GEO,
		{
			house_number: string;
			street: string;
		}
	> {}

export type IYandexTypeValue =
	| IYandexTypeValueDateTime
	| IYandexTypeFio
	| IYandexTypeNumber
	| IYandexTypeGeo;
