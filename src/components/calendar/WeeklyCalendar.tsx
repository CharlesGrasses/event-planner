import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cx from 'classnames';
import { Assorted, DatesUtilities } from '@/services/common';
import GatheringListModal from '../modal/Gatherings/GatheringListModal';
import { Gathering } from '@/types/gatherings';

interface TimeSlotGatherings {
    [key: string]: Gathering[];
}

const WeeklyCalendar = ({ locale = 'en-US' }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [timeSlotGatherings, setTimeSlotGatherings] = useState<TimeSlotGatherings>({});

    const weekDayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const dateFormatter = new Intl.DateTimeFormat(locale, { day: 'numeric' });
    const monthYearFormatter = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    const timeFormatter = new Intl.DateTimeFormat(locale, { hour: 'numeric', hour12: false });

    const getWeekDates = (date: Date) => {
        const start = new Date(date);
        start.setDate(date.getDate() - date.getDay() + (locale.startsWith('en') ? 0 : 1));

        const dates = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            dates.push(day);
        }
        return dates;
    };

    const hours = Array.from({ length: 24 }, (_, i) => i);

    const getTimeSlotKey = (date: Date, hour: number) => {
        const slotDate = new Date(date);
        slotDate.setHours(hour, 0, 0, 0);
        return slotDate.toISOString();
    }

    
};