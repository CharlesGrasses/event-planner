"use client";

import React, { useState, useEffect } from 'react';

import APIrequests from '@/services/api-requests';

import { Gathering } from '@/types/gatherings';

import GatheringListModal from '@/components/modal/Gatherings/GatheringListModal';
import HourCalendarSlotData from '@/components/calendar/calendar-views/common/slot-data/HourCalendarSlotData';
import DayHeader from '@/components/calendar/calendar-views/common/DayHeader';
import TimeColumn from '@/components/calendar/calendar-views/common/TimeColumn';


interface TimeSlotGatherings {
    [key: string]: Gathering[];
}

interface DailyCalendarProps {
    locale?: string;
    currentDate: Date;
}


const DailyCalendar = (
    {
        locale = 'en-US',
        currentDate
    }: DailyCalendarProps
) => {

    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [timeSlotGatherings, setTimeSlotGatherings] = useState<TimeSlotGatherings>({});


    const hours = Array.from({ length: 16 }, (_, i) => i+9);

    const getTimeSlotKey = (date: Date, hour: number) => {
        const slotDate = new Date(date);
        slotDate.setHours(hour, 0, 0, 0);
        return slotDate.toISOString();
    };

    useEffect(() => {
        const fetchGatheringsForWeek = async () => {
            const gatheringsMap: TimeSlotGatherings = {};

            const fetchPromises = hours.map(async hour => {
                    const timeSlotKey = getTimeSlotKey(currentDate, hour);
                    try {
                        gatheringsMap[timeSlotKey] = await APIrequests.getGatheringsForTimeSlot(currentDate, hour);
                    } catch (error) {
                        console.error(`Error fetching gatherings for ${timeSlotKey}:`, error);
                        gatheringsMap[timeSlotKey] = [];
                    }
                }
            );

            await Promise.all(fetchPromises);
            setTimeSlotGatherings(gatheringsMap);
        };

        fetchGatheringsForWeek();
    }, [currentDate]);

    return (
        <div>
            {/* Calendar Grid */}
            <div className='grid grid-cols-[10%_90%]'>
                
                {/* Time column */}
                <TimeColumn
                    hours={hours}
                />

                {/* Day column */}
                <div className='relative'>

                    <DayHeader
                        locale={locale}
                        date={currentDate}
                        daily={true}
                    />

                    {hours.map(hour => (
                        <div key={`${currentDate.toISOString()}-${hour}`}>
                            <HourCalendarSlotData
                                date={currentDate}
                                hour={hour}
                                dateIndex={6}
                                slotGatherings={timeSlotGatherings[getTimeSlotKey(currentDate, hour)] || []}
                                onClick={setSelectedDateTime}
                            />
                        </div>
                    ))}
                </div>
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

export default DailyCalendar;