/* 
    Clock should show real time based on localization
    Should show AM/PM
    SHould It show in 12 or 24 hrs  format
*/

import { useEffect, useState } from "react";

function formattedTime(time: Date, hoursFormate: number) {
    let HH = new Date(time).getHours();
    HH = hoursFormate == 12 ? HH % 12 : HH;

    let MM: string | number = new Date(time).getMinutes();
    MM = MM < 10 ? "0" + MM : MM;

    let SS: string | number = new Date(time).getSeconds();
    SS = SS < 10 ? "0" + SS : SS;

    const AM_PM = HH >= 12 ? "PM" : "AM";

    return `${HH}:${MM}:${SS} ${AM_PM}`;
}

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());
    const [hoursFormate, setHoursFormate] = useState(24);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time]);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold">DigitalClock</h1>
            <select
                className="outline-1"
                value={hoursFormate}
                onChange={(e) => setHoursFormate(+e.target.value)}
            >
                <option value={12}>12</option>
                <option value={24}>24</option>
            </select>
            <p className="text-3xl">{formattedTime(time, hoursFormate)}</p>
        </div>
    );
};

export default DigitalClock;
