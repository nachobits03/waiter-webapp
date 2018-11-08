module.exports = function (waiterdb) {
    async function sort () {
        let allShifts = await waiterdb.allShifts();
        let allWorkdays = await waiterdb.allDays();
        let waiterList = [];
        // console.log('here', allShifts)

        for (let workdays of allWorkdays) {
            let stacker = [];
            let workday = workdays.workday;

            for (let shift of allShifts) {
                // console.log(shift.workday)
                if (workday === shift.workday) {
                    // console.log(shift.waiter)
                    stacker.push(shift.waiter);
                };
            }
            // console.log(stacker)
            waiterList.push(
                { day: workday,
                    waiters: stacker }
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
        let waiterid = await waiterdb.waiter(waiter);
        console.log(waiterid);
    }

    return {
        sort,
        waiterCheck,
        addShift
    };
};
