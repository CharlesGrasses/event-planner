import React from "react";

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { DatesUtilities, TextUtilities } from "@/services";

import { CalendarView } from "@/types";

interface CalendarMonthHeaderProps { 
    locale?: string;
    navigateCalendar: (direction: number, chevronClick?: boolean) => void;
    currentDate: Date;
    view: CalendarView;
}

const CalendarMonthHeader = ({ 
    locale = 'es-CL',
    navigateCalendar,
    currentDate,
    view = 'month'
}: CalendarMonthHeaderProps) => {
    // Create a stable date reference
    const displayDate = DatesUtilities.copyDate(currentDate);
    
    const getDateFormat = () => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
        
        switch(view) {
            case 'day':
                options.month = 'long';
                options.day = 'numeric';
                break;
            default:
                options.month = 'long';
                break;
        }
        
        return new Intl.DateTimeFormat(locale, options);
    };

    return (
        <div className='flex flex-row items-center'>
            <h3 className='text-2xl font-bold calendarTitle'>
                {TextUtilities.toUpperCaseFirstLetter(getDateFormat().format(displayDate))}
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