"use client";

import React, { useState, useEffect } from 'react';

import APIrequests from '@/services/api-requests';

import { Gathering } from '@/types/gatherings';

import GatheringListModal from '@/components/modal/Gatherings/GatheringListModal';
import WeeklyCalendarSlotData from '@/components/calendar/calendar-views/weekly/WeeklyCalendarSlotData';
import WeeklyDayHeader from '@/components/calendar/calendar-views/weekly/WeeklyDayHeader';
import WeeklyTimeColumn from '@/components/calendar/calendar-views/weekly/WeeklyTimeColumn';


interface TimeSlotGatherings {
    [key: string]: Gathering[];
}

interface WeeklyCalendarProps {
    locale?: string;
    currentDate: Date;
}


const WeeklyCalendar = (
    {
        locale = 'en-US',
        currentDate
    }: WeeklyCalendarProps
) => {

    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [timeSlotGatherings, setTimeSlotGatherings] = useState<TimeSlotGatherings>({});

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

    const hours = Array.from({ length: 16 }, (_, i) => i+9);

    const getTimeSlotKey = (date: Date, hour: number) => {
        const slotDate = new Date(date);
        slotDate.setHours(hour, 0, 0, 0);
        return slotDate.toISOString();
    };

    useEffect(() => {
        const fetchGatheringsForWeek = async () => {
            const weekDates = getWeekDates(currentDate);
            const gatheringsMap: TimeSlotGatherings = {};

            const fetchPromises = weekDates.flatMap(date =>
                hours.map(async hour => {
                    const timeSlotKey = getTimeSlotKey(date, hour);
                    try {
                        gatheringsMap[timeSlotKey] = await APIrequests.getGatheringsForTimeSlot(date, hour);
                    } catch (error) {
                        console.error(`Error fetching gatherings for ${timeSlotKey}:`, error);
                        gatheringsMap[timeSlotKey] = [];
                    }
                })
            );

            await Promise.all(fetchPromises);
            setTimeSlotGatherings(gatheringsMap);
        };

        fetchGatheringsForWeek();
    }, [currentDate]);

    const weekDates = getWeekDates(currentDate);

    return (
        <div>
            {/* Calendar Grid */}
            <div className='grid grid-cols-8'>
                
                {/* Time column */}
                <WeeklyTimeColumn
                    hours={hours}
                />

                {/* Other Columns */}
                {weekDates.map((date, dateIndex) => (
                    <div key={date.toISOString()} className='relative'>

                        <WeeklyDayHeader
                            locale={locale}
                            date={date}
                        />

                        {hours.map(hour => (
                            <WeeklyCalendarSlotData
                                date={date}
                                hour={hour}
                                dateIndex={dateIndex}
                                slotGatherings={timeSlotGatherings[getTimeSlotKey(date, hour)] || []}
                                onClick={setSelectedDateTime}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* GatheringsModal */}
            {selectedDateTime && (
                <GatheringListModal
                    locale={locale}
                    isOpen={!!selectedDateTime}
                    onClose={() => setSelectedDateTime(null)}
                    selectedDate={selectedDateTime}
                    gatherings={timeSlotGatherings[selectedDateTime.toISOString()] || []}
                />
            )}
        </div>
    );
};

export default WeeklyCalendar;