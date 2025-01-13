"use client";

import React, { useState, useEffect } from "react";
import cx from "classnames";

import { DatesUtilities } from "@/services/common";
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
                    gatheringsMap[dateKey] = await getGatheringsForDate(date);
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

    const getGatheringsForDate = async (date: Date) => {
        // CAMBIAR CUANDO SE HAYA CREADO LA API
        // Mocking variables
        const venues = [
            "Plaza de armas",
            "Teatro Municipal",
            "Parque Forestal",
            "Centro Cultural GAM",
            "Club Chocolate",
            "Bar La Obra",
            "Estadio Nacional",
            "Blondie",
            "La Cúpula",
            "Centro de Eventos Chimkowe"
        ];
        const timeSlots = [
            "7:00 PM - 8:30 PM",
            "8:00 PM - 9:30 PM",
            "9:00 PM - 10:30 PM",
            "10:00 PM - 11:30 PM",
            "6:30 PM - 8:00 PM",
            "7:30 PM - 9:00 PM",
            "8:30 PM - 10:00 PM",
            "9:30 PM - 11:00 PM",
            "6:00 PM - 7:30 PM",
            "11:00 PM - 12:30 AM"
        ];
        const bands = [
            "Oscilan",
            "Phuyu y la fantasma",
            "Asia Menor",
            "Chini.png",
            "Estoy bien",
            "Sinópticos",
            "Monos Chinos",
            "Monos Chinos Submarinos",
            "Niños del Cerro",
            "Javiera Electra",
            "Los Pulentos",
            "Mist",
            "Weezer",
            "Gepe",
            "Alex Andwanter",
            "El mató a un policía motorizado",
            "Negra Ácida",
            "Dënver",
            "Pau",
            "Brígida Orquesta",
            "Dolorío y los tunantes"
        ];
        const generateCapacity = () => {
            const capacities = [200, 300, 400, 500, 750, 1000, 1500, 2000, 2500, 3000];
            return capacities[Math.floor(Math.random() * capacities.length)];
        };

        return bands.slice(0, Math.floor(Math.random() * bands.length)).map((band, index) => ({
            id: `${index + 1}`,
            title: `Concierto ${band}`,
            time: timeSlots[index % timeSlots.length],
            location: venues[index % venues.length],
            capacity: generateCapacity(),
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hendrerit auctor odio, sit amet gravida est tincidunt iaculis. Quisque luctus porta dolor, vitae vestibulum leo luctus ac. Suspendisse interdum ante a sapien dapibus, nec porttitor nunc eleifend. Curabitur dignissim, quam vitae tempus molestie, enim arcu feugiat mauris, et tempor neque massa semper sem."
        }));
    };

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