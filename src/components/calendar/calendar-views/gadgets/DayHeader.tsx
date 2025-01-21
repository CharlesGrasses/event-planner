import React, { useMemo } from 'react';

import cx from 'classnames';

import { DatesUtilities } from '@/services';

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

    const displayDate = useMemo(() => DatesUtilities.copyDate(date), [date.getTime()]);
    
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
                {daily ? `${computerWeekdayUser[displayDate.getDay()].longName}\u00A0` : computerWeekdayUser[displayDate.getDay()].shortName}
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
                    day: 'numeric'
                }).format(displayDate)}
            </div>
        </div>
    );
};

export default DayHeader;