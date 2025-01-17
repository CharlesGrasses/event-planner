import React from 'react';
import cx from 'classnames';

import { DatesUtilities } from '@/services/common';


interface DailyDayHeaderProps {
    locale: string,
    date: Date
}


const DailyDayHeader = (
    {
        locale = 'en-US',
        date = new Date()
    }: DailyDayHeaderProps
) => {

    const computerWeekdayUser = DatesUtilities.computerWdayUser(locale);
    const dateFormatter = new Intl.DateTimeFormat(locale, { day: 'numeric' });

    return (
        <div className='h-16 border-b border-[var(--ocean-50)] flex flex-col items-center jusstify-center'>
            <div className='text-lg titleText'>
                {computerWeekdayUser[date.getDay()].shortName}
            </div>
            <div className={cx(
                'text-base titleText rounded-full p-1',
                { calendarDateToday: DatesUtilities.isToday(date) }
            )}>
                {dateFormatter.format(date)}
            </div>
        </div>
    );
};

export default DailyDayHeader;