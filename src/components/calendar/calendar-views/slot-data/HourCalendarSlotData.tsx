import React from 'react';
import cx from 'classnames';

import { DatesUtilities } from "@/services/common";

import { Gathering } from '@/types/gatherings';

import { DayCalendarSlotData } from '@/components/calendar/calendar-views/slot-data/DayCalendarSlotData';


interface HourCalendarSlotDataProps {
    date: Date;
    hour: number;
    dateIndex: number,
    slotGatherings: Gathering[];
    onClick: any
}


const HourCalendarSlotData = (
    {
        date = new Date(),
        hour = 0,
        dateIndex = 0,
        slotGatherings = [],
        onClick = null
    }: HourCalendarSlotDataProps
) => {

    const isPast = DatesUtilities.isPast(new Date(date.setHours(hour)));

    const handleTimeSlotClick = (date: Date, hour: number) => {
        if (!DatesUtilities.isPast(date)) {
            const slotDate = new Date(date);
            slotDate.setHours(hour, 0, 0, 0);
            onClick(date);
        }
    };

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
                <DayCalendarSlotData
                    gatherings={slotGatherings}
                />
            )}
        </div>
    );
}

export default HourCalendarSlotData;