"use client";

import React, { useState, useEffect } from 'react';

import { DatesUtilities } from '@/services';

import { MONDAY_SHORT } from '@/constants';

import { MonthlyCalendarData, MonthlyCalendarRow } from '@/components/calendar';


interface MonthlyCalendarProps {
    locale:string,
    currentDate:Date
}


const MonthlyCalendar = (
    {
        locale = 'en-US',
        currentDate = new Date(),
    }: MonthlyCalendarProps
) => {

    const deviceTOplatform: any = DatesUtilities.computerWdayUser(
        locale,
        MONDAY_SHORT
    );

    const getMonthData = () => {
        const year = currentDate.getFullYear();
        const monthNumber = currentDate.getMonth();

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

    const [calendarDays, setCalendarDays] = useState(getMonthData());
    useEffect(() => {
        setCalendarDays(getMonthData());
    }, [currentDate]);

    return (
        <div>
            <MonthlyCalendarRow
                locale={locale}
                userWeekday={MONDAY_SHORT}
            />
            <MonthlyCalendarData
                locale={locale}
                calendarDays={calendarDays}
            />
        </div>
    );
};

export { MonthlyCalendar };