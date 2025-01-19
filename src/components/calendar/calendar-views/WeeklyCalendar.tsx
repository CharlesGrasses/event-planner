"use client";

import React, { useState, useEffect, useMemo } from 'react';

import APIrequests from '@/services/api-requests';

import { Gathering } from '@/types/gatherings';

import GatheringListModal from '@/components/modal/Gatherings/GatheringListModal';
import HourCalendarSlotData from '@/components/calendar/calendar-views/gadgets/slot-data/HourCalendarSlotData';
import DayHeader from '@/components/calendar/calendar-views/gadgets/DayHeader';
import TimeColumn from '@/components/calendar/calendar-views/gadgets/TimeColumn';


interface TimeSlotGatherings {
    [key: string]: Gathering[];
}

interface WeeklyCalendarProps {
    locale?: string;
    currentDate: Date;
}


const getTimeSlotKey = (date: Date, hour: number) => {
    // Create UTC date for consistent keys
    const slotDate = new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        hour,
        0,
        0,
        0
    ));
    return slotDate.toISOString();
};


const WeeklyCalendar = ({
    locale = 'en-US',
    currentDate
}: WeeklyCalendarProps) => {
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [timeSlotGatherings, setTimeSlotGatherings] = useState<TimeSlotGatherings>({});
    
    const displayDate = useMemo(() => new Date(currentDate.getTime()), [currentDate.getTime()]);
    const hours = useMemo(() => Array.from({ length: 16 }, (_, i) => i + 9), []);

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

    useEffect(() => {
        let isMounted = true;

        const fetchGatheringsForWeek = async () => {
            const weekDates = getWeekDates(currentDate);
            const gatheringsMap: TimeSlotGatherings = {};

            try {
                const fetchPromises = weekDates.flatMap(date =>
                    hours.map(async hour => {
                    const timeSlotKey = getTimeSlotKey(date, hour);
                    try {
                        const gatherings = await APIrequests.getGatheringsForTimeSlot(date, hour);
                        if (isMounted) {
                            gatheringsMap[timeSlotKey] = gatherings;
                        }
                    } catch (error) {
                        console.error(`Error fetching gatherings for ${timeSlotKey}:`, error);
                        if (isMounted) {
                            gatheringsMap[timeSlotKey] = [];
                        }
                    }
                })
            );

                await Promise.all(fetchPromises);
                if (isMounted) {
                    setTimeSlotGatherings(gatheringsMap);
                }
            } catch (error) {
                console.error('Error fetching gatherings:', error);
                if (isMounted) {
                    setTimeSlotGatherings({});
                }
            }
        };

        fetchGatheringsForWeek();

        return () => {
            isMounted = false;
        };
    }, [displayDate, hours]);

    const weekDates = getWeekDates(currentDate);

    return (
        <div>
            {/* Calendar Grid */}
            <div className='grid grid-cols-[9%_13%_13%_13%_13%_13%_13%_13%]'>
                
                {/* Time column */}
                <TimeColumn
                    hours={hours}
                />

                {/* Other Columns */}
                {weekDates.map((date, dateIndex) => (
                    <div key={date.toISOString()} className='relative'>

                        <DayHeader
                            locale={locale}
                            date={date}
                            daily={false}
                        />

                        {hours.map(hour => (
                            <div key={`${date.toISOString()}-${hour}`}>
                                <HourCalendarSlotData
                                    date={date}
                                    hour={hour}
                                    dateIndex={dateIndex}
                                    slotGatherings={timeSlotGatherings[getTimeSlotKey(date, hour)] || []}
                                    onClick={(date: Date) => { setSelectedDateTime(date); }}
                                />
                            </div>
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
                    gatherings={timeSlotGatherings[getTimeSlotKey(selectedDateTime, selectedDateTime.getUTCHours())] || []}
                />
            )}
        </div>
    );
};
export default WeeklyCalendar;