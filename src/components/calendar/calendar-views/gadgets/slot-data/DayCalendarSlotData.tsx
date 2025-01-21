import React from "react";

import { Gathering } from "@/types";


const DayCalendarSlotData = ( { gatherings = [] } : { gatherings:Gathering[] } ) => {
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

export { DayCalendarSlotData };