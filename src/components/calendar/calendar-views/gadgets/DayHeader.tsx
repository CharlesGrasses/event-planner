import React, { useMemo } from 'react';

import cx from 'classnames';

import { DatesUtilities } from '@/services/common';

interface DayHeaderProps {
    locale: string,
    date: Date,
    daily: boolean
}

const DayHeader = ({
    locale = 'en-US',
    date,
    daily = false
}: DayHeaderProps) => {
    // Create a stable date reference preserving the original time
    const displayDate = useMemo(() => {
        const newDate = new Date(date);
        // Ensure we're working with the date in local time
        newDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        return newDate;
    }, [date]);
    
    const computerWeekdayUser = DatesUtilities.computerWdayUser(locale);

    return (
        <div className={cx(
            `h-16 border-b border-[var(--ocean-50)] flex items-center`,
            {
                'flex-col justify-center': !daily
            }
        )}>
            <div className={
                cx(
                    'text-[var(--aqua-water-60)]',
                    {
                        'text-2xl': daily,
                        'text-lg': !daily 
                    }
                    )}>
                {daily ? `${computerWeekdayUser[displayDate.getUTCDay()].longName}\u00A0` : computerWeekdayUser[displayDate.getUTCDay()].shortName}
            </div>
            <div className={cx(
                'rounded-full p-1 text-[var(--aqua-water-60)]',
                {
                    calendarDateToday: DatesUtilities.isToday(displayDate),
                    'text-2xl': daily,
                    'text-lg': !daily 
                }
            )}>
                {new Intl.DateTimeFormat(locale, { 
                    day: 'numeric',
                    timeZone: 'UTC'
                }).format(displayDate)}
            </div>
        </div>
    );
};

export default DayHeader;