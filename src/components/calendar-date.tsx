import * as React from 'react';

type CalendarDateProps = {
    date: Date;
};

const CalendarDate = ({date}: CalendarDateProps) => {
    const month = date.toLocaleDateString(undefined, {month: "short"});
    const day = date.toLocaleDateString(undefined, {day: "numeric"});
    const now = (new Date()).getTime();
    const isExpired = now > date.getTime();
    
    return (
        <div className="w-20 overflow-hidden shadow rounded-xl">
            <div className={`flex flex-col justify-center w-full h-8 uppercase ${(isExpired) ? 'bg-indigo-300' : 'bg-indigo-500'}`}>
                <p className="text-sm font-medium text-center text-white">{month}</p>
            </div>
            <div className="flex flex-col justify-center h-14 bg-gray-50">
                <p className={`text-2xl font-bold text-center ${(isExpired) ? 'text-gray-400' : 'text-gray-600'}`}>{day}</p>
            </div>
        </div>
    );
};

export default CalendarDate;