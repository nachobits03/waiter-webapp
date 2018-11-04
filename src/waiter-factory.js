module.exports = function (waiterdb) {
    async function sort () {
        let allShifts = await waiterdb.allShifts();
        let allWorkdays = await waiterdb.allDays();
        let waiterList = [];
        // console.log(allWaiters)

        for (let workdays of allWorkdays) {
            let stacker = [];
            let workday = workdays.workday;

            for (let shift of allShifts) {
                if (workday === shift.workday) {
                    stacker.push(shift.waiter);
                };
            }

            waiterList.push([
                { day: workday },
                { waiters: stacker }
            ]);
        }
        console.log(waiterList);
    }
    return {
        sort
    };
};
