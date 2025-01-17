

namespace Assorted {
    export function toUpperCaseFirstLetter (anyString: string) {
        return String(anyString).charAt(0).toUpperCase() + String(anyString).slice(1);
    }
}

namespace DatesUtilities {
    const weekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short'});

    function getWeekdayNumber ( weekday:string ) {
        switch (weekday) {
            case weekdayFormatter.format(new Date(2024, 6, 0)):
                return new Date(2024, 6, 0).getDay();
            case weekdayFormatter.format(new Date(2024, 6, 1)):
                return new Date(2024, 6, 1).getDay();
            case weekdayFormatter.format(new Date(2024, 6, 2)):
                return new Date(2024, 6, 2).getDay();
            case weekdayFormatter.format(new Date(2024, 6, 3)):
                return new Date(2024, 6, 3).getDay();
            case weekdayFormatter.format(new Date(2024, 6, 4)):
                return new Date(2024, 6, 4).getDay();
            case weekdayFormatter.format(new Date(2024, 6, 5)):
                return new Date(2024, 6, 5).getDay();
            case weekdayFormatter.format(new Date(2024, 6, 6)):
                return new Date(2024, 6, 6).getDay();
            default:
                return new Date(2024, 6, 0).getDay();
        }
    }

    function weekdaysTranslation( 
        locale:string = 'en-US',
        translationType:string = 'deviceTOplatform',
        beginWith:string = weekdayFormatter.format(new Date(2024, 6, 0))
    ) {
        const localeShortFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short'});
        const localeLongFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long'});
        const weekdayNumber = getWeekdayNumber(beginWith);
        const translation:any = {};

        for (let i = weekdayNumber; i < weekdayNumber+7; i++) {
            const date = new Date(2024, 6, i);

            if (translationType === 'deviceTOplatform')
                translation[date.getDay()] = {
                    number: i-1,
                    shortName: Assorted.toUpperCaseFirstLetter(localeShortFormatter.format(date)),
                    longName: Assorted.toUpperCaseFirstLetter(localeLongFormatter.format(date))
                };
            else
                translation[i-1] = {
                    number: date.getDay(),
                    shortName: Assorted.toUpperCaseFirstLetter(localeShortFormatter.format(date)),
                    longName: Assorted.toUpperCaseFirstLetter(localeLongFormatter.format(date))
                };
        }

        return translation;
    }

    export function userWdayComputer (
        locale:string = 'en-US',
        userWday:string = weekdayFormatter.format((locale.startsWith('en') ? new Date(2024, 6, 0) :new Date(2024, 6, 1)))
    ) {
        return weekdaysTranslation(locale, 'platformTOdevice', userWday);
    }

    export function computerWdayUser (
        locale:string = 'en-US',
        userWday:string = weekdayFormatter.format((locale.startsWith('en') ? new Date(2024, 6, 0) :new Date(2024, 6, 1)))
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
}

export { Assorted, DatesUtilities };