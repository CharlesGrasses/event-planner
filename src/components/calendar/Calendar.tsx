"use client";

import React, { useState, useEffect } from 'react';

import { DatesUtilities } from '@/services/common';

import CalendarMonth from './CalendarMonth';
import CalendarWeekdays from './CalendarWeekdays';
import CalendarData from './CalendarData';

const USAWeekdayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short'});

const Calendar = ( { locale = 'en-US' }: { locale?: string } ) => {
    const userWeekday = USAWeekdayFormatter.format(new Date(2024, 6, 1)); // change to useState so the user can chage it.
    const deviceTOplatform:any = DatesUtilities.computerWdayUser(locale, USAWeekdayFormatter.format(new Date(2024, 6, 1)) );

    const [currentDate, setCurrentDate] = useState(new Date());
    const [year, setYear] = useState(currentDate.getFullYear());
    const [monthNumber, setMonth] = useState(currentDate.getMonth());

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

        for (let i = firstWeekdayMonth-1; i >= 0; i--) days.push(new Date(year, monthNumber, 0 - i));
        for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, monthNumber, i));
        for (let i = lastWeekdayMonth+1; i <= 6; i++) days.push(new Date(year, monthNumber, daysInMonth+i-lastWeekdayMonth));

        return days;
    };

    const navigateMonth = (direction: number, chevronClick: boolean) => {
        const newDate = chevronClick ? new Date(year, monthNumber, 1) : new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCalendarStates(newDate);
    };

    const [calendarDays, setCalendarDays] = useState(getMonthData());
    useEffect(() => {
        setCalendarDays(getMonthData());
    }, [currentDate, year, monthNumber])

    return (
        <div className='rounded-2xl border shadow-lg w-full max-w-screen-2xl mx-auto overflow-hidden m-4 calendarHolder'>
            <CalendarMonth locale={locale} navigateMonth={navigateMonth} currentDate={currentDate} />

            <div>
                <CalendarWeekdays locale={locale} userWeekday={userWeekday} />
                <CalendarData locale={locale} calendarDays={calendarDays}/>
            </div>
        </div>
    );
};

export default Calendar;