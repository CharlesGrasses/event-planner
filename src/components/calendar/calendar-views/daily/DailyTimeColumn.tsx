import React from 'react';


interface DailyTimeColumnProps {
    hours: Array<number>
}


const DailyTimeColumn = (
    {
        hours = Array.from({ length: 13 }, (_, i) => i+12)
    }: DailyTimeColumnProps
) => {

    return (
        <div>
            <div className='h-16 flex items-center justify-center text-[var(--aqua-water-50)] titleText'>
                Hora de inicio
            </div>
            {hours.map(hour => (
                <div
                    key={hour}
                    className='h-14 border-r border-[var(--ocean-50)] flex items-center justify-center text-[var(--aqua-water-50)]'
                >
                    {`${hour.toString().padStart(2,'0')}:00`}
                </div>
            ))}
        </div>
    );
};

export default DailyTimeColumn;