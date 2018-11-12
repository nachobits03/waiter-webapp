module.exports = function (waiterdb) {
    async function sort () {
        let allShifts = await waiterdb.allShifts();
        let allWorkdays = await waiterdb.allDays();
        let waiterList = [];
        // console.log('here', allShifts)

        for (let workdays of allWorkdays) {
            let stacker = [];
            let status;
            let workday = workdays.workday;

            for (let shift of allShifts) {
                // console.log(shift.workday)
                if (workday === shift.workday) {
                    // console.log(shift.waiter)
                    stacker.push(shift.waiter);
                };
                if (stacker.length < 3) {
                    status = 'understaffed';
                } else if (stacker.length === 3) {
                    status = 'fullystaffed';
                } else if (stacker.length > 3) {
                    status = 'overstaffed';
                }
            }
            // console.log(stacker)
            waiterList.push(
                { day: workday,
                    waiters: stacker,
                    status: status }
            );
        }
        console.log('this', waiterList);
        return waiterList;
    }

    async function waiterCheck (name) {
        let allWaiters = await waiterdb.allWaiters();
        // console.log('here', waiters)
        let waiters = allWaiters.map(name => name.waiter);
        for (let waiter of waiters) {
            if (name === waiter) {
                return true;
            }
        }
    }

    async function addShift (waiter, day) {
        let waiterCurrent = await waiterdb.waiter(waiter);
        let waiterid = waiterCurrent.waiterid;
        console.log(waiterid);
        await waiterdb.addShifts(waiterid, day);
    }

    async function clearOld (waiter) {
        let waiterCurrent = await waiterdb.waiter(waiter);
        let waiterid = waiterCurrent.waiterid;
        await waiterdb.clearOld(waiterid);
    }

    async function shiftView (waiter) {
        let weekdays = await waiterdb.allDays();
        let selectedDays = await waiterdb.currentWaiterShift(waiter);
        if (selectedDays.length === 0) {
            return weekdays;
        } else {
            let shifts = [];

            for (let day of weekdays) {
                for (sd of selectedDays) {
                    if (day.workday === sd && shifts.workday !== day) {
                        shifts.push({
                            workday: day.workday,
                            value: 'checked'
                        });
                    }
                }
            }

            // let shifts = weekdays.map(function (weekdays) {
            //     for (let sd of selectedDays) {
            //         // console.log(sd.workday, weekdays.workday);
            //         if (sd.workday === weekdays.workday) {
            //             return { workday: weekdays.workday,
            //                 value: 'checked' };
            //         } else if (sd.workday !== weekdays.workday) {
            //             return { workday: weekdays.workday,
            //                 value: 'unchecked' };
            //         }
            //     }
            // });

            return shifts;
        }
    }

    return {
        sort,
        waiterCheck,
        addShift,
        clearOld,
        shiftView
    };
};
