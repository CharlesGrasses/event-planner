"use client";

import React, { useState, useEffect } from "react";
import cx from "classnames";

import { APIrequests, DatesUtilities } from "@/services";

import { Gathering } from "@/types";

import { DayCalendarSlotData } from "@/components/calendar";
import { GatheringListModal } from "@/components/modal";


interface MonthlyCalendarSlotsDataProps {
    locale:string,
    calendarDays:any,
    handleDateClick: (date:Date) => void
}

interface DateGatherings {
    [key: string]: Gathering[];
}


const MonthlyCalendarSlotsData = (
    {
        locale = 'esCL',
        calendarDays = [new Date()],
        handleDateClick
    } : MonthlyCalendarSlotsDataProps
) => {

    const [dateGatherings, setDateGatherings] = useState<DateGatherings>({});
    const dateFormatter = new Intl.DateTimeFormat(locale, { day: 'numeric'});

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
                                    calendarDateFromThePast: DatesUtilities.isPastDay(date),
                                    calendarDate: !DatesUtilities.isPastDay(date),
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
                                        dateFormatter.format(date).length < 2 
                                        ? `${dateFormatter.format(date)}\u00A0\u00A0\u00A0`
                                        : `${dateFormatter.format(date)}\u00A0`
                                    }
                                </div>
                            </div>
                            <DayCalendarSlotData
                                gatherings={dateGatherings[getDateKey(date)]}
                            />
                        </div>
                    ))
                }
            </div>
        </>

    );
};

export { MonthlyCalendarSlotsData };