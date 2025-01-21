const weekdayFormatterShort = new Intl.DateTimeFormat('en-US', { weekday: 'short'});
const weekdayFormatterLong = new Intl.DateTimeFormat('en-US', { weekday: 'long'});

export const DISPLAY_HOURS_PER_DAY = 24;

export const SUNDAY_DATE_YEAR = 2024;
export const SUNDAY_DATE_MONTH = 6;

export const SUNDAY_DATE = new Date(2024, 6, 0);
export const MONDAY_DATE = new Date(2024, 6, 1);
export const TUESDAY_DATE = new Date(2024, 6, 2);
export const WEDNESDAY_DATE = new Date(2024, 6, 3);
export const THURSDAY_DATE = new Date(2024, 6, 4);
export const FRIDAY_DATE = new Date(2024, 6, 5);
export const SATURDAY_DATE = new Date(2024, 6, 6);

export const SUNDAY_NUMBER = new Date(2024, 6, 0).getDay();
export const MONDAY_NUMBER = new Date(2024, 6, 1).getDay();
export const TUESDAY_NUMBER = new Date(2024, 6, 2).getDay();
export const WEDNESDAY_NUMBER = new Date(2024, 6, 3).getDay();
export const THURSDAY_NUMBER = new Date(2024, 6, 4).getDay();
export const FRIDAY_NUMBER = new Date(2024, 6, 5).getDay();
export const SATURDAY_NUMBER = new Date(2024, 6, 6).getDay();

export const SUNDAY_SHORT = weekdayFormatterShort.format(new Date(2024, 6, 0))
export const MONDAY_SHORT = weekdayFormatterShort.format(new Date(2024, 6, 1))
export const TUESDAY_SHORT = weekdayFormatterShort.format(new Date(2024, 6, 2))
export const WEDNESDAY_SHORT = weekdayFormatterShort.format(new Date(2024, 6, 3))
export const THURSDAY_SHORT = weekdayFormatterShort.format(new Date(2024, 6, 4))
export const FRIDAY_SHORT = weekdayFormatterShort.format(new Date(2024, 6, 5))
export const SATURDAY_SHORT = weekdayFormatterShort.format(new Date(2024, 6, 6))

export const SUNDAY_LONG = weekdayFormatterLong.format(new Date(2024, 6, 0))
export const MONDAY_LONG = weekdayFormatterLong.format(new Date(2024, 6, 1))
export const TUESDAY_LONG = weekdayFormatterLong.format(new Date(2024, 6, 2))
export const WEDNESDAY_LONG = weekdayFormatterLong.format(new Date(2024, 6, 3))
export const THURSDAY_LONG = weekdayFormatterLong.format(new Date(2024, 6, 4))
export const FRIDAY_LONG = weekdayFormatterLong.format(new Date(2024, 6, 5))
export const SATURDAY_LONG = weekdayFormatterLong.format(new Date(2024, 6, 6))

