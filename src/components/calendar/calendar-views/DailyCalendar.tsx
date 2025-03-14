"use client";

import React, { useState, useEffect, useMemo } from 'react';

import { DISPLAY_HOURS_PER_DAY } from '@/constants';

import { APIrequests, DatesUtilities } from '@/services';

import { Gathering } from '@/types';

import { GatheringListModal } from '@/components/modal';
import { DayHeader, HourCalendarSlotData, TimeColumn } from '@/components/calendar';

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
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [timeSlotGatherings, setTimeSlotGatherings] = useState<TimeSlotGatherings>({});
    
    const displayDate = useMemo(() => DatesUtilities.copyDate(currentDate), [currentDate.getTime()]);
    const hours = useMemo(() => Array.from({ length: DISPLAY_HOURS_PER_DAY }, (_, i) => i + (24 - DISPLAY_HOURS_PER_DAY + 1)), []);

    useEffect(() => {
        let isMounted = true;

        const fetchGatheringsForDay = async () => {
            const gatheringsMap: TimeSlotGatherings = {};

            try {
                const fetchPromises = hours.map(async hour => {
                    const timeSlotKey = DatesUtilities.getTimeSlotKey(displayDate, hour);
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
                                slotGatherings={timeSlotGatherings[DatesUtilities.getTimeSlotKey(displayDate, hour)] || []}
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
                    gatherings={timeSlotGatherings[DatesUtilities.getTimeSlotKey(selectedDateTime, selectedDateTime.getHours())] || []}
                />
            )}
        </div>
    );
};

export { DailyCalendar };