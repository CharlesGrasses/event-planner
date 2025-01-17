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


const DailyCalendar = ({
    locale = 'en-US',
    currentDate
}: DailyCalendarProps) => {
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [timeSlotGatherings, setTimeSlotGatherings] = useState<TimeSlotGatherings>({});
    
    const displayDate = useMemo(() => new Date(currentDate.getTime()), [currentDate.getTime()]);
    const hours = useMemo(() => Array.from({ length: 16 }, (_, i) => i + 9), []);

    useEffect(() => {
        let isMounted = true;

        const fetchGatheringsForDay = async () => {
            const gatheringsMap: TimeSlotGatherings = {};

            try {
                const fetchPromises = hours.map(async hour => {
                    const timeSlotKey = getTimeSlotKey(displayDate, hour);
                    try {
                        const gatherings = await APIrequests.getGatheringsForTimeSlot(displayDate, hour);
                        if (isMounted) {
                            gatheringsMap[timeSlotKey] = gatherings;
                        }
                    } catch (error) {
                        console.error(`Error fetching gatherings for ${timeSlotKey}:`, error);
                        if (isMounted) {
                            gatheringsMap[timeSlotKey] = [];
                        }
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
                        <div key={`${displayDate.toISOString()}-${hour}`}>
                            <HourCalendarSlotData
                                date={displayDate}
                                hour={hour}
                                dateIndex={6}
                                slotGatherings={timeSlotGatherings[getTimeSlotKey(displayDate, hour)] || []}
                                onClick={(date: Date) => { setSelectedDateTime(date); }}
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
                    gatherings={timeSlotGatherings[getTimeSlotKey(selectedDateTime, selectedDateTime.getUTCHours())] || []}
                />
            )}
        </div>
    );
};

export default DailyCalendar;