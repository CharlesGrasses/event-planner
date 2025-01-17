"use client";

import React, { useState, useEffect, useMemo } from 'react';

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

const DailyCalendar = ({
    locale = 'en-US',
    currentDate
}: DailyCalendarProps) => {
    const displayDate = useMemo(() => new Date(currentDate.getTime()), [currentDate.getTime()]);
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [timeSlotGatherings, setTimeSlotGatherings] = useState<TimeSlotGatherings>({});

    const hours = useMemo(() => Array.from({ length: 16 }, (_, i) => i + 9), []);

    const getTimeSlotKey = (date: Date, hour: number) => {
        // Create a new date object to avoid mutations
        const slotDate = new Date(date.getTime());
        slotDate.setHours(hour, 0, 0, 0);
        return slotDate.toISOString();
    };

    useEffect(() => {
        let isMounted = true;

        const fetchGatheringsForDay = async () => {
            const gatheringsMap: TimeSlotGatherings = {};

            try {
                const fetchPromises = hours.map(async hour => {
                    const timeSlotKey = getTimeSlotKey(displayDate, hour);
                    try {
                        gatheringsMap[timeSlotKey] = await APIrequests.getGatheringsForTimeSlot(displayDate, hour);
                    } catch (error) {
                        console.error(`Error fetching gatherings for ${timeSlotKey}:`, error);
                        gatheringsMap[timeSlotKey] = [];
                    }
                });

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

        fetchGatheringsForDay();

        return () => {
            isMounted = false;
        };
    }, [displayDate, hours]);

    const dateKey = useMemo(() => displayDate.toISOString(), [displayDate]);

    return (
        <div>
            {/* Calendar Grid */}
            <div className='grid grid-cols-[10%_90%]'>
                {/* Time column */}
                <TimeColumn hours={hours} />

                {/* Day column */}
                <div className='relative'>
                    <DayHeader
                        locale={locale}
                        date={displayDate}
                        daily={true}
                    />

                    {hours.map(hour => (
                        <div key={`${dateKey}-${hour}`}>
                            <HourCalendarSlotData
                                date={displayDate}
                                hour={hour}
                                dateIndex={6}
                                slotGatherings={timeSlotGatherings[getTimeSlotKey(displayDate, hour)] || []}
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