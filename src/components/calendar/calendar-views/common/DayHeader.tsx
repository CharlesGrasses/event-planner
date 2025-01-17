import React from 'react';
import cx from 'classnames';

import { DatesUtilities } from '@/services/common';


interface DayHeaderProps {
    locale: string,
    date: Date,
    daily: boolean
}


const DayHeader = (
    {
        locale = 'en-US',
        date = new Date(),
        daily = false
    }: DayHeaderProps
) => {

    const computerWeekdayUser = DatesUtilities.computerWdayUser(locale);
    const dateFormatter = new Intl.DateTimeFormat(locale, { day: 'numeric' });

    return (
        <div className={cx(
            `h-16 border-b border-[var(--ocean-50)] flex items-center jusstify-center`,
            {
                'flex-col': !daily
            }
        )}>
            <div className={cx(
                {
                    'text-lg': !daily,
                    'text-2xl': daily
                }
            )}>
                {computerWeekdayUser[date.getDay()].shortName}
            </div>
            <div className={cx(
                'rounded-full p-1',
                {
                    calendarDateToday: DatesUtilities.isToday(date),
                    'text-base': !daily,
                    'text-2xl': daily
                }
            )}>
                {dateFormatter.format(date)}
            </div>
        </div>
    );
};

export default DayHeader;