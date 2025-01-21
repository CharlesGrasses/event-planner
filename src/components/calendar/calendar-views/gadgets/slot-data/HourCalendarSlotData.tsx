import React from 'react';
import cx from 'classnames';

import { DatesUtilities } from "@/services";

import { Gathering } from '@/types';

import { DayCalendarSlotData } from '@/components/calendar';


interface HourCalendarSlotDataProps {
    date: Date;
    hour: number;
    dateIndex: number;
    slotGatherings: Gathering[];
    onClick: any;
}


const HourCalendarSlotData = ({
    date = new Date(),
    hour = 0,
    dateIndex = 6,
    slotGatherings = [],
    onClick = null
}: HourCalendarSlotDataProps) => {
    const handleTimeSlotClick = (date: Date, hour: number) => {
        const slotDate = DatesUtilities.copyDateSetHour(date, hour);
        onClick(slotDate);
    };

    const checkDate = DatesUtilities.copyDateSetHour(date, hour);
    const isPast = DatesUtilities.isPast(checkDate);

    return (
        <div
            key={`${date.toISOString()}-${hour}`}
            onClick={() => !isPast && handleTimeSlotClick(date, hour)}
            className={cx(
                'h-20 border-b border-[var(--ocean-50)] flex transition-colors p-1',
                {
                    'border-r': dateIndex < 6,
                    'calendarDateFromThePast': isPast,
                    'calendarDate cursor-pointer': !isPast
                }
            )}
        >
            {slotGatherings.length > 0 && (
                <DayCalendarSlotData gatherings={slotGatherings} />
            )}
        </div>
    );
};

export { HourCalendarSlotData };