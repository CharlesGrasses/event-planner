"use client";

import React, { useState, useEffect, useMemo } from 'react';

import { APIrequests, DatesUtilities } from '@/services';
import { MONDAY_SHORT } from '@/constants';
import { Gathering } from '@/types';

import { GatheringListModal } from '@/components/modal';
import { DayHeader, HourCalendarSlotData, TimeColumn } from '@/components/calendar';


interface TimeSlotGatherings {
    [key: string]: Gathering[];
}

interface WeeklyCalendarProps {
    locale?: string;
    currentDate: Date;
}


const WeeklyCalendar = ({
    locale = 'en-US',
    currentDate
}: WeeklyCalendarProps) => {
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [timeSlotGatherings, setTimeSlotGatherings] = useState<TimeSlotGatherings>({});
    
    const displayDate = useMemo(() => DatesUtilities.copyDate(currentDate), [currentDate.getTime()]);
    const hours = useMemo(() => Array.from({ length: 16 }, (_, i) => i + 9), []);

    const deviceTOplatform: any = DatesUtilities.computerWdayUser(
        locale,
        MONDAY_SHORT
    );

    const getWeekDates = (date: Date) => {
        const year = currentDate.getFullYear();
        const monthNumber = currentDate.getMonth();

        const startDate = date.getDate() - deviceTOplatform[date.getDay()].number + DatesUtilities.getFirstWeekday(locale);
        
        const dates = [];

        for (let i = 0; i < 7; i++) {
            dates.push(new Date(year, monthNumber, startDate+i));
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
                    const timeSlotKey = DatesUtilities.getTimeSlotKey(date, hour);
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
                                    slotGatherings={timeSlotGatherings[DatesUtilities.getTimeSlotKey(date, hour)] || []}
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
                    gatherings={timeSlotGatherings[DatesUtilities.getTimeSlotKey(selectedDateTime, selectedDateTime.getUTCHours())] || []}
                />
            )}
        </div>
    );
};
export { WeeklyCalendar };