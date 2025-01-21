import { BANDS, VENUES, DESCRIPTION } from "@/constants/mocking-api";

namespace APIrequests {
    // CAMBIAR CUANDO SE HAYA CREADO LA API
    export async function getGatheringsForDate (date: Date) {
        const hour = Math.floor(Math.random() * 12);
        return BANDS.slice(0, Math.floor(Math.random() * BANDS.length)).map((band, index) => ({
            id: `${index + 1}`,
            title: `${band} en concierto`,
            time: `${hour}:00 PM - ${hour + 2}:00 PM`,
            location: VENUES[index % VENUES.length],
            capacity: 200 + Math.floor(Math.random() * 2000),
            description: DESCRIPTION
        }));
    }

    export async function getGatheringsForTimeSlot (date: Date, hour: number) {
        if(Math.random() > 0.3) return [];

        return BANDS.slice(0, Math.floor(Math.random() * BANDS.length)).map((band, index) => ({
            id: `${date.toISOString}-${hour}-${index}`,
            title: `${band} en concierto`,
            time: `${hour}:00 - ${hour + 2}:00`,
            location: VENUES[index % VENUES.length],
            capacity: 200 + Math.floor(Math.random() * 2000),
            description:DESCRIPTION
        }));
    }
}

export { APIrequests };