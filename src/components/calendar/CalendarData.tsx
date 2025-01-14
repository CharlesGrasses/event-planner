"use client";

import React, { useState, useEffect } from "react";
import cx from "classnames";

import { DatesUtilities } from "@/services/common";
import APIrequests from "@/services/api-requests";
import GatheringListModal from "../modal/Gatherings/GatheringListModal";

import { Gathering } from "@/types/gatherings";

interface DateGatherings {
    [key: string]: Gathering[];
}

const GatheringPreviews = ( { gatherings = [] } : { gatherings:Gathering[] } ) => {
    if (gatherings.length === 0) return null;

    return (
        <div className="mt-1 text-xs space-y-0.5 overflow-hidden">
            {gatherings.map((gathering, idx) => (
                <div
                    key={idx}
                    className="truncate text-[var(--aqua-water-50)] px-1 py-0.5"
                >
                    {gathering.title}
                </div>
            ))}
        </div>
    );
};

const CalendarData = (
    {
        locale = 'esCL',
        calendarDays = [new Date()]
    } : {
        locale:string,
        calendarDays:any
    }
) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [dateGatherings, setDateGatherings] = useState<DateGatherings>({});
    const DayMonthFormatter = new Intl.DateTimeFormat(locale, { day: 'numeric'});

    const getDateKey = (date: Date) => date.toISOString().split('T')[0];

    useEffect(() => {
        const fetchGatheringsForAllDates = async () => {
            const gatheringsMap: DateGatherings = {};

            const fetchPromises = calendarDays.map(async (date: Date) => {
                const dateKey = getDateKey(date);
                try {
                    gatheringsMap[dateKey] = await APIrequests.getGatheringsForDate(date);
                } catch (error) {
                    console.error(`!!!!!!!!!!!!!!!!!!!!ENVENT PLANER ERROR:`);
                    console.error(`Error fetching gatherings for ${date}:`, error);
                    gatheringsMap[dateKey] = [];
                }
            });

            await Promise.all(fetchPromises);
            setDateGatherings(gatheringsMap);
        };

        fetchGatheringsForAllDates();
    }, [calendarDays]);

    const handleDateClick = (date: Date) => {
        if (!DatesUtilities.isPast(date)) {
            setSelectedDate(date);
        }
    };

    return(
        <>
            <div className='grid grid-cols-7'>
                {
                    calendarDays.map((date:Date, index:any) => (
                        <div
                            key={index}
                            onClick={() => handleDateClick(date)}
                            className={cx(
                                `aspect-video transition-colors flex calendarCell p-1`,
                                {
                                    calendarDatefromThePast: DatesUtilities.isPast(date),
                                    calendarDate: !DatesUtilities.isPast(date),
                                    calendarDateBorderRight: (index%7) < 6,
                                    calendarDateBorderBottom: index < calendarDays.length - 7
                                }
                            )}
                        >
                            <div className="flex flex-col">
                                <div
                                    className={cx(
                                        'text-base titleText rounded-full p-1 titleText',
                                        { 
                                            calendarDateToday: DatesUtilities.isToday(date)
                                        }
                                    )}
                                >
                                    {
                                        DayMonthFormatter.format(date).length < 2 
                                        ? `${DayMonthFormatter.format(date)}\u00A0\u00A0`
                                        : `${DayMonthFormatter.format(date)}\u00A0`
                                    }
                                </div>
                            </div>
                            <GatheringPreviews
                                gatherings={dateGatherings[getDateKey(date)]}
                            />
                        </div>
                    ))
                }
            </div>

            <GatheringListModal
                locale={locale}
                isOpen={!!selectedDate}
                onClose={() => setSelectedDate(null)}
                selectedDate={selectedDate}
                gatherings={selectedDate ? dateGatherings[getDateKey(selectedDate)] : []}

            />
        </>

    );
};

export default CalendarData;