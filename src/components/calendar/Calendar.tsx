"use client";

import React, { useState } from 'react';

import { CalendarView } from '@/types/calendar';

import CalendarHeader from '@/components/calendar/header/CalendarHeader';
import MonthlyCalendar from '@/components/calendar/calendar-views/monthly/MonthlyCalendar';
import WeeklyCalendar from '@/components/calendar/calendar-views/weekly/WeeklyCalendar';
//import DailyCalendar from './calendar-views/daily/DailyCalendar';

interface CalendarProps {
    locale: string;
}


const Calendar = (
    {
        locale = 'en-US'
    }: CalendarProps
) => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [year, setYear] = useState(currentDate.getFullYear());
    const [monthNumber, setMonth] = useState(currentDate.getMonth());
    const [view, setView] = useState<CalendarView>('month');

    const setCalendarStates = (date: Date) => {
        setCurrentDate(date);
        setYear(date.getFullYear());
        setMonth(date.getMonth());
    };

    const navigateCalendar = (direction: number, chevronClick: boolean = true) => {
        const newDate = chevronClick ? new Date(year, monthNumber, 1) : new Date(currentDate);
        if (view === 'month') {
            newDate.setMonth(currentDate.getMonth() + direction);
        } else {
            newDate.setDate(currentDate.getDate() + direction * 7);
        }
        setCalendarStates(newDate);
    };

    const toggleView = () => {
        setView(prev => prev === 'month' ? 'week' : 'month');
    };

    return (
        <div className='rounded-2xl border shadow-lg w-full max-w-screen-2xl mx-auto overflow-hidden m-4 calendarHolder'>

            {/* Calendar Header */}
            <CalendarHeader
                locale={locale}
                currentDate={currentDate}
                view={view}
                toggleView={toggleView}
                navigateCalendar={navigateCalendar}
            />

            {/* Calendar Content */}
            {view === 'month' ? (
                <div>
                    <MonthlyCalendar
                        locale={locale}
                        currentDate={currentDate}
                    />
                </div>
            ) : (
                <WeeklyCalendar
                    locale={locale}
                    currentDate={currentDate}
                />
            )}
        </div>
    );
};

export default Calendar;