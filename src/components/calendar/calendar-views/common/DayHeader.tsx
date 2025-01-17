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
    const dateFormatter = new Intl.DateTimeFormat(locale, { 
        weekday: daily ? 'long' : 'short',
        day: 'numeric',
        month: daily ? 'long' : undefined,
        year: daily ? 'numeric' : undefined,
        timeZone: 'UTC' // Force UTC to match other components
    });

    return (
        <div className={cx(
            `h-16 border-b border-[var(--ocean-50)] flex items-center justify-center`,
            {
                'flex-col': !daily
            }
        )}>
            {!daily ? (
                <>
                    <div className='text-lg'>
                        {computerWeekdayUser[displayDate.getUTCDay()].shortName}
                    </div>
                    <div className={cx(
                        'rounded-full p-1',
                        {
                            calendarDateToday: DatesUtilities.isToday(displayDate)
                        }
                    )}>
                        {new Intl.DateTimeFormat(locale, { 
                            day: 'numeric',
                            timeZone: 'UTC'
                        }).format(displayDate)}
                    </div>
                </>
            ) : (
                <div className='text-2xl'>
                    {dateFormatter.format(displayDate)}
                </div>
            )}
        </div>
    );
};

export default DayHeader;