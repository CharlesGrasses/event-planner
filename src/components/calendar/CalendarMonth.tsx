import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Assorted } from "@/services/common";

const CalendarMonth = ( 
    { 
        locale = 'es-CL',
        navigateMonth = null,
        currentDate = new Date(),
    }: { 
        locale?: string,
        navigateMonth: any,
        currentDate: Date,
    }
) => {
    const MonthDateFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });

    return (
        <div className='flex flex-row items-center justify-between p-6 calendarHeader'>
            <h3 className='text-2xl font-bold calendarTitle'>
                {Assorted.toUpperCaseFirstLetter(MonthDateFormatter.format(currentDate))}
            </h3>
            <div className='flex items-center space-x-4'>
                <button
                    onClick={() => navigateMonth(-1, true)}
                    className='p-2 rounded-full transition-colors iconClickable'
                >
                    <ChevronLeft className='h-8 w-8' color='var(--aqua-water-20)' />
                </button>
                <button
                    onClick={() => navigateMonth(1, true)}
                    className='p-2 rounded-full transition-colors iconClickable'
                >
                    <ChevronRight className='h-8 w-8' color='var(--aqua-water-20)' />
                </button>
            </div>
        </div>
    );
};

export default CalendarMonth;