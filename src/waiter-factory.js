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
                    stacker.push(
                        {waiter: shift.waiter}
                        );
                };
            }
            // console.log(stacker)
            waiterList.push(
                { day: workday,
                 waiters: stacker }
            );
        }
        console.log('this', JSON.stringify(waiterList));
        return waiterList
    }
    return {
        sort
    };
};
