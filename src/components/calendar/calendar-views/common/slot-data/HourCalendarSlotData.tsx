import React from 'react';
import cx from 'classnames';

import { DatesUtilities } from "@/services/common";

import { Gathering } from '@/types/gatherings';

import { DayCalendarSlotData } from '@/components/calendar/calendar-views/common/slot-data/DayCalendarSlotData';


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
        // Create new UTC date
        const slotDate = new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            hour,
            0,
            0,
            0
        ));
        onClick(slotDate);
    };

    // For the isPast check, we need to consider UTC
    const checkDate = new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        hour,
        0,
        0,
        0
    ));
    const isPast = DatesUtilities.isPast(checkDate);

    return (
        <div
            key={`${date.toISOString()}-${hour}`}
            onClick={() => !isPast && handleTimeSlotClick(date, hour)}
            className={cx(
                'h-14 border-b border-[var(--ocean-50)] flex transition-colors p-1',
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

export default HourCalendarSlotData;