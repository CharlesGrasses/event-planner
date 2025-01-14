"use client";

import React, { useState, useEffect } from 'react';
import { ViewIcon } from 'lucide-react';

import { DatesUtilities } from '@/services/common';

import CalendarMonth from './CalendarMonth';
import CalendarWeekdays from './CalendarWeekdays';
import CalendarData from './CalendarData';
import WeeklyCalendar from './WeeklyCalendar';

type CalendarView = 'month' | 'week';

const Calendar = ({ locale = 'en-US' }: { locale?: string }) => {
    const USAWeekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
    const deviceTOplatform: any = DatesUtilities.computerWdayUser(
        locale,
        USAWeekdayFormatter.format(new Date(2024, 6, 1))
    );

    const [currentDate, setCurrentDate] = useState(new Date());
    const [year, setYear] = useState(currentDate.getFullYear());
    const [monthNumber, setMonth] = useState(currentDate.getMonth());
    const [view, setView] = useState<CalendarView>('month');

    const setCalendarStates = (date: Date) => {
        setCurrentDate(date);
        setYear(date.getFullYear());
        setMonth(date.getMonth());
    };

    const getMonthData = () => {
        const firstWeekdayMonth = deviceTOplatform[new Date(year, monthNumber, 1).getDay()].number;
        const lastWeekdayMonth = deviceTOplatform[new Date(year, monthNumber + 1, 0).getDay()].number;
        const daysInMonth = new Date(year, monthNumber + 1, 0).getDate();
        const days = [];

        for (let i = firstWeekdayMonth - 1; i >= 0; i--)
            days.push(new Date(year, monthNumber, 0 - i));
        for (let i = 1; i <= daysInMonth; i++)
            days.push(new Date(year, monthNumber, i));
        for (let i = lastWeekdayMonth + 1; i <= 6; i++)
            days.push(new Date(year, monthNumber, daysInMonth + i - lastWeekdayMonth));

        return days;
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

    const [calendarDays, setCalendarDays] = useState(getMonthData());
    useEffect(() => {
        if (view === 'month') {
            setCalendarDays(getMonthData());
        }
    }, [currentDate, year, monthNumber, view]);

    return (
        <div className='rounded-2xl border shadow-lg w-full max-w-screen-2xl mx-auto overflow-hidden m-4 calendarHolder'>

            {/* Calendar Header */}
            <div className='flex flex-row items-center justify-between p-6 calendarHeader'>
                <div className='flex items-center space-x-4'>
                    <CalendarMonth
                        locale={locale}
                        navigateMonth={navigateCalendar}
                        currentDate={currentDate}
                    />
                    <button
                        onClick={toggleView}
                        className='p-2 rounded-full transition-colors iconClickable ml-4'
                        aria-label={`Switch to ${view === 'month' ? 'week' : 'month'} view`}
                    >
                        <ViewIcon className='h-6 w-6' color='var(--aqua-water-20)' />
                    </button>
                </div>
            </div>

            {/* Calendar Content */}
            {view === 'month' ? (
                <div>
                    <CalendarWeekdays locale={locale} userWeekday={USAWeekdayFormatter.format(new Date(2024, 6, 1))} />
                    <CalendarData locale={locale} calendarDays={calendarDays} />
                </div>
            ) : (
                <WeeklyCalendar
                    locale={locale}
                    currentDate={currentDate}
                    onNavigate={navigateCalendar}
                />
            )}
        </div>
    );
};

export default Calendar;