import * as dateConstants from '@/constants/dates';

namespace TextUtilities {
    export function toUpperCaseFirstLetter (anyString: string) {
        return String(anyString).charAt(0).toUpperCase() + String(anyString).slice(1);
    }
}

namespace DatesUtilities {
    function getWeekdayNumber ( weekday:string ) {
        switch (weekday) {
            case dateConstants.SUNDAY_SHORT:
                return dateConstants.SUNDAY_NUMBER;
            case dateConstants.MONDAY_SHORT:
                return dateConstants.MONDAY_NUMBER;
            case dateConstants.TUESDAY_SHORT:
                return dateConstants.TUESDAY_NUMBER;
            case dateConstants.WEDNESDAY_SHORT:
                return dateConstants.WEDNESDAY_NUMBER;
            case dateConstants.THURSDAY_SHORT:
                return dateConstants.THURSDAY_NUMBER;
            case dateConstants.FRIDAY_SHORT:
                return dateConstants.FRIDAY_NUMBER;
            case dateConstants.SATURDAY_SHORT:
                return dateConstants.SATURDAY_NUMBER;
            default:
                return dateConstants.SUNDAY_NUMBER;
        }
    }

    function weekdaysTranslation( 
        locale:string = 'en-US',
        translationType:string = 'deviceTOplatform',
        beginWith:string = locale.startsWith('en') ? dateConstants.SUNDAY_SHORT : dateConstants.MONDAY_SHORT
    ) {
        const localeShortFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short'});
        const localeLongFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long'});
        const weekdayNumber = getWeekdayNumber(beginWith);
        const translation:any = {};

        for (let i = weekdayNumber; i < weekdayNumber+7; i++) {
            const date = new Date(dateConstants.SUNDAY_DATE_YEAR, dateConstants.SUNDAY_DATE_MONTH, i);

            if (translationType === 'deviceTOplatform')
                translation[date.getDay()] = {
                    number: i-1,
                    shortName: TextUtilities.toUpperCaseFirstLetter(localeShortFormatter.format(date)),
                    longName: TextUtilities.toUpperCaseFirstLetter(localeLongFormatter.format(date))
                };
            else
                translation[i-1] = {
                    number: date.getDay(),
                    shortName: TextUtilities.toUpperCaseFirstLetter(localeShortFormatter.format(date)),
                    longName: TextUtilities.toUpperCaseFirstLetter(localeLongFormatter.format(date))
                };
        }

        return translation;
    }

    export function userWdayComputer (
        locale:string = 'en-US',
        userWday:string = locale.startsWith('en') ? dateConstants.SUNDAY_SHORT : dateConstants.MONDAY_SHORT
    ) {
        return weekdaysTranslation(locale, 'platformTOdevice', userWday);
    }

    export function computerWdayUser (
        locale:string = 'en-US',
        userWday:string = locale.startsWith('en') ? dateConstants.SUNDAY_SHORT : dateConstants.MONDAY_SHORT
    ){
        return weekdaysTranslation(locale, 'deviceTOplatform', userWday);
    }

    export function isToday (date: Date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    export function isPast (date: Date) {
        const today = new Date().setHours(0, 0, 0, 0);
        return date.getTime() < today;
    }

    export function copyDate(date: Date) {
        return new Date(date.getTime());
    }

    export function copyDateSetHour (date: Date, hour: number) {
        const newDate = copyDate(date);
        newDate.setHours(hour, 0, 0, 0);
        return newDate;
    }

    export function getTimeSlotKey (date: Date, hour: number) {
        return copyDateSetHour(date, hour).toISOString();
    };

    export function getFirstWeekday (locale: string) {
        return (locale.startsWith('en') ? 0 : 1);
    }

}

export { TextUtilities, DatesUtilities };