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
        try {
            let weekdays = await waiterdb.allDays();
            let selectedDays = await waiterdb.currentWaiterShift(waiter);
            let shiftwork = selectedDays.map(input => input.workday);
            let weekday = weekdays.map(input => input.workday);
            let shifts = [];
            // console.log(shiftwork)
            if (selectedDays.length === 0) {
                return weekdays;
            } else {
                for (let shift of shiftwork) {
                    for (let i = 0; i < weekday.length; i++) {

                        if (shifts.length <= 6) {
                            shifts.push({
                                workday: weekday[i],
                                value: 'unchecked'
                            });
                        }
                        // console.log(shiftwork[i], weekday[i])
                        if (shift === weekday[i]) {
                        // console.log(shiftwork[i], weekday[i])
                            shifts[i].value = 'oldchecked';
                        }

                    }
                };
                console.log(shifts);
                return shifts;
            }
        } catch (err) {
            console.error(err);
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
