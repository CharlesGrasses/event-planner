import React from "react";

import { DatesUtilities } from "@/services/common";

const USAWeekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short'});

const CalendarWeekdays = (
    {
        locale = 'es-CL',
        userWeekday = USAWeekdayFormatter.format(new Date(2024, 6, 1))
    }: { 
        locale?:string,
        userWeekday:string
    }
) => {
    const platformTOdevice:any = DatesUtilities.userWdayComputer(locale, userWeekday);

    return (
        <div className='grid grid-cols-7'>
            {
                Object.values(platformTOdevice).map( (day:any, index) => (
                    <div
                        key={day.shortName}
                        className='text-center text-2xl p-3 flex flex-col calendarCell calendarDateBorderBottom'
                    >
                        {day.shortName}
                    </div>
                ))
            }
        </div>
    );
};

export default CalendarWeekdays;