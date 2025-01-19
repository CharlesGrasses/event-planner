import React from 'react';
import { CalendarView } from '@/types/calendar';
import CalendarMonthHeader from '@/components/calendar/header/CalendarMonthHeader';
import ViewSwitcher from '@/components/calendar/header/ViewSwitcher';

interface CalendarHeaderProps {
    locale: string;
    currentDate: Date;
    view: CalendarView;
    toggleView: (newView: CalendarView) => void;  // Updated to accept the new view directly
    navigateCalendar: (direction: number, chevronClick?: boolean) => void;
}

const CalendarHeader = ({
    locale = 'en-US',
    currentDate = new Date(),
    view = 'month',
    toggleView,
    navigateCalendar
}: CalendarHeaderProps) => {
    return (
        <div className='flex flex-row items-center justify-between p-6 calendarHeader'>
            <div className='flex items-center space-x-4'>
                <CalendarMonthHeader
                    locale={locale}
                    navigateCalendar={navigateCalendar}
                    currentDate={currentDate}
                    view={view}
                />
                <ViewSwitcher 
                    currentView={view} 
                    onViewChange={toggleView}  // Pass the function directly
                />
            </div>
        </div>
    );
};

export default CalendarHeader;