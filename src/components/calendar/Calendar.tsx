"use client";

import React, { useState } from 'react';

import { CalendarView } from '@/types/calendar';

import CalendarHeader from '@/components/calendar/header/CalendarHeader';
import MonthlyCalendar from '@/components/calendar/calendar-views/MonthlyCalendar';
import WeeklyCalendar from '@/components/calendar/calendar-views/WeeklyCalendar';
import DailyCalendar from '@/components/calendar/calendar-views/DailyCalendar';

interface CalendarProps {
    locale: string;
}


const Calendar = ({
    locale = 'en-US'
}: CalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<CalendarView>('month');

    const navigateCalendar = (direction: number, chevronClick: boolean = true) => {
        const newDate = new Date(currentDate);
        
        switch(view) {
            case 'month':
                newDate.setMonth(currentDate.getMonth() + direction);
                break;
            case 'week':
                newDate.setDate(currentDate.getDate() + (direction * 7));
                break;
            case 'day':
                newDate.setDate(currentDate.getDate() + direction);
                break;
        }
        
        setCurrentDate(newDate);
    };

    const setCalendarView = (newView: CalendarView) => {
        setView(newView);
    };

    return (
        <div className='rounded-2xl border shadow-lg w-full max-w-screen-2xl mx-auto overflow-hidden m-4 calendarHolder'>
            <CalendarHeader
                locale={locale}
                currentDate={currentDate}
                view={view}
                toggleView={setCalendarView}
                navigateCalendar={navigateCalendar}
            />

            {view === 'month' ? (
                <MonthlyCalendar
                    locale={locale}
                    currentDate={currentDate}
                />
            ) : view === 'week' ? (
                <WeeklyCalendar
                    locale={locale}
                    currentDate={currentDate}
                />
            ) : (
                <DailyCalendar
                    locale={locale}
                    currentDate={currentDate}
                />
            )}
        </div>
    );
};

export default Calendar;