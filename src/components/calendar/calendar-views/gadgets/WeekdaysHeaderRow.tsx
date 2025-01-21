import React from "react";

import { MONDAY_SHORT } from "@/constants";

import { DatesUtilities } from "@/services";


interface MonthlyWeekdaysProps {
    locale?:string,
    userWeekday:string
}


const MonthlyCalendarWeekdays = (
    {
        locale = 'es-CL',
        userWeekday = MONDAY_SHORT
    }: MonthlyWeekdaysProps
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


export default MonthlyCalendarWeekdays;