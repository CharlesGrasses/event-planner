"use client";

import React, { useState } from 'react';

import { CalendarView } from '@/types';

import { DatesUtilities } from '@/services';

import { CalendarHeader, MonthlyCalendar, WeeklyCalendar, DailyCalendar } from '@/components/calendar';

interface CalendarProps {
    locale: string;
}


const Calendar = ({
    locale = 'en-US'
}: CalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<CalendarView>('month');

    const navigateCalendar = (direction: number, chevronClick: boolean = true) => {
        const newDate = DatesUtilities.copyDate(currentDate);
        
        switch(view) {
            case 'month':
                newDate.setUTCMonth(currentDate.getUTCMonth() + direction);
                break;
            case 'week':
                newDate.setUTCDate(currentDate.getUTCDate() + (direction * 7));
                break;
            case 'day':
                newDate.setUTCDate(currentDate.getUTCDate() + direction);
                break;
        }
        
        setCurrentDate(newDate);
    };

    const handleMonthlyClick = (date: Date) => {
        if (!DatesUtilities.isPastDay(date)) {
            setCalendarView('day');
            setCurrentDate(date);
        }
    }

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
                    handleDateClick={handleMonthlyClick}
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

export { Calendar };