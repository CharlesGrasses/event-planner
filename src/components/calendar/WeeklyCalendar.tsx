import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { DatesUtilities } from '@/services/common';
import APIrequests from '@/services/api-requests';
import GatheringListModal from '@/components/modal/Gatherings/GatheringListModal';
import { Gathering } from '@/types/gatherings';

interface TimeSlotGatherings {
    [key: string]: Gathering[];
}

interface WeeklyCalendarProps {
    locale?: string;
    currentDate: Date;
    onNavigate?: (direction: number, chevronClick: boolean) => void;
}

const WeeklyCalendar = ({
    locale = 'en-US',
    currentDate,
    onNavigate
}: WeeklyCalendarProps) => {
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [timeSlotGatherings, setTimeSlotGatherings] = useState<TimeSlotGatherings>({});

    const weekDayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const dateFormatter = new Intl.DateTimeFormat(locale, { day: 'numeric' });
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

    const handleTimeSlotClick = (date: Date, hour: number) => {
        if (!DatesUtilities.isPast(date)) {
            const slotDate = new Date(date);
            slotDate.setHours(hour, 0, 0, 0);
            setSelectedDateTime(slotDate);
        }
    };

    const weekDates = getWeekDates(currentDate);

    return (
        <div>
            {/* Calendar Grid */}
            <div className='grid grid-cols-8'>
                
                {/* Time column */}
                <div className='border-r border-[var(--ocean-50)]'>
                    <div className='h-16 border-b border-[var(--ocean-50)]'></div>
                    {hours.map(hour => (
                        <div
                            key={hour}
                            className='h-16 border-b border-[var(--ocean-50)] flex items-center justify-center text-[var(--aqua-water-50)]'
                        >
                            {`${hour.toString().padStart(2,'0')}:00`}
                        </div>
                    ))}
                </div>

                {/* Days Columns */}
                {weekDates.map((date, dateIndex) => (
                    <div key={date.toISOString()} className='relative'>

                        {/* Day header */}
                        <div className='h-16 border-b border-[var(--ocean-50)] flex flex-col items-center jusstify-center'>
                            <div className='text-lg titleText'>
                                {weekDayFormatter.format(date)}
                            </div>
                            <div className={cx(
                                'text-base titleText rounded-full p-1',
                                { calendarDateToday: DatesUtilities.isToday(date) }
                            )}>
                                {dateFormatter.format(date)}
                            </div>
                        </div>

                        {/* Time slots */}
                        {hours.map(hour => {
                            const timeSlotKey = getTimeSlotKey(date, hour);
                            const slotGatherings = timeSlotGatherings[timeSlotKey] || [];
                            const isPast = DatesUtilities.isPast(new Date(date.setHours(hour)));

                            return (
                                <div
                                    key={`${date.toISOString()}-${hour}`}
                                    onClick={() => !isPast && handleTimeSlotClick(date, hour)}
                                    className={cx(
                                        'h-16 border-b border-[var(--ocean-50)] transition-colors p-1',
                                        {
                                            'border-r': dateIndex < 6,
                                            'calendarDateFromThePast': isPast,
                                            'calendarDate cursor-pointer': !isPast
                                        }
                                    )}
                                >
                                    {slotGatherings.length > 0 && (
                                        <div className='mt-1 text-xs space-y-0.5 overflow-hidden'>
                                            {slotGatherings.map((gathering, idx) => (
                                                <div
                                                    key={idx}
                                                    className='truncate text-[var(--aqua-water-50)] px-1 py-0.5'
                                                >
                                                    {gathering.title}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
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