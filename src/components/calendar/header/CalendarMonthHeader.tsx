import React from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Assorted } from "@/services/common";
import { CalendarView } from "@/types/calendar";

interface CalendarMonthHeaderProps { 
    locale?: string;
    navigateCalendar: (direction: number, chevronClick?: boolean) => void;
    currentDate: Date;
    view: CalendarView;
}

const CalendarMonthHeader = ({ 
    locale = 'es-CL',
    navigateCalendar,
    currentDate = new Date(),
    view = 'month'
}: CalendarMonthHeaderProps) => {
    const getDateFormat = () => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
        
        switch(view) {
            case 'month':
                options.month = 'long';
                break;
            case 'week':
                options.month = 'long';
                options.day = 'numeric';
                break;
            case 'day':
                options.month = 'long';
                options.day = 'numeric';
                options.weekday = 'long';
                break;
        }
        
        return new Intl.DateTimeFormat(locale, options);
    };

    return (
        <div className='flex flex-row items-center'>
            <h3 className='text-2xl font-bold calendarTitle'>
                {Assorted.toUpperCaseFirstLetter(getDateFormat().format(currentDate))}
            </h3>
            <div className='flex items-center space-x-4 ml-4'>
                <button
                    onClick={() => navigateCalendar(-1, true)}
                    className='p-2 rounded-full transition-colors iconClickable'
                >
                    <ChevronLeft className='h-8 w-8' color='var(--aqua-water-20)' />
                </button>
                <button
                    onClick={() => navigateCalendar(1, true)}
                    className='p-2 rounded-full transition-colors iconClickable'
                >
                    <ChevronRight className='h-8 w-8' color='var(--aqua-water-20)' />
                </button>
            </div>
        </div>
    );
};

export default CalendarMonthHeader;