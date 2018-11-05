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
    return {
        sort
    };
};
