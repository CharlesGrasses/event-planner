import React from 'react';
import { ViewIcon } from 'lucide-react';

import { CalendarView } from '@/types/calendar';

import CalendarMonthHeader from '@/components/calendar/header/CalendarMonthHeader';

interface CalendarHeaderProps {
    locale: string;
    currentDate: Date;
    view: CalendarView;
    toggleView: () => void;
    navigateCalendar: (direction: number, chevronClick?: boolean) => void;
}

const CalendarHeader = ({
    locale = 'en-US',
    currentDate = new Date(),
    view = 'month',
    toggleView,
    navigateCalendar
}: CalendarHeaderProps) => {
    const getNextView = () => {
        switch(view) {
            case 'month': return 'week';
            case 'week': return 'day';
            default: return 'month';
        }
    };

    return (
        <div className='flex flex-row items-center justify-between p-6 calendarHeader'>
            <div className='flex items-center space-x-4'>
                <CalendarMonthHeader
                    locale={locale}
                    navigateCalendar={navigateCalendar}
                    currentDate={currentDate}
                    view={view}
                />
                <button
                    onClick={toggleView}
                    className='p-2 rounded-full transition-colors iconClickable ml-4'
                    aria-label={`Switch to ${getNextView()} view`}
                >
                    <ViewIcon className='h-6 w-6' color='var(--aqua-water-20)' />
                </button>
            </div>
        </div>
    );
};

export default CalendarHeader;