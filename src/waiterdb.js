module.exports = function (pool) {
    async function allShifts () {
        try {
            let shifts = await pool.query('select waiters.waiter, workdays.workday from waiters inner join shifts on waiters.waiterid = shifts.waiterid inner join workdays on workdays.workdayid = shifts.workdayid;');
            // console.log(shifts.rows)
            return shifts.rows;
        } catch (err) {
            console.error(err);
        }
    }

    async function allWaiters () {
        try {
            let waiters = await pool.query('select * from waiters;');
            return waiters.rows;
        } catch (err) {
            console.error(err);
        }
    }

    async function allDays () {
        try {
            let workdays = await pool.query('select workday from workdays;');
            return workdays.rows;
        } catch (err) {
            console.error(err);
        }
    }

    async function waiter (waiter) {
        try {
            let currentWaiter = await pool.query('select 1 waiterid from waiters where waiter = $1 limit 1', [waiter]);
            return currentWaiter.rows;
        } catch (err) {
            console.error(err);
        }
    }

    async function addShifts(waiter, shift){
        
    }

    return {
        allShifts,
        allWaiters,
        allDays,
        waiter
    };
};
