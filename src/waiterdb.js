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
        console.log(waiter);
        try {
            let currentWaiter = await pool.query('select waiterid from waiters where waiter = ($1) limit 1', [waiter]);
            return currentWaiter.rows[0];
        } catch (err) {
            console.error(err);
        }
    }

    async function addShifts (waiterid, shift) {
        try {
            if (waiterid !== '' && shift !== '') {
                await pool.query('insert into shifts (waiterid, workdayid) values ($1, $2)', [waiterid, shift]);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function clearOld (waiterid) {
        try {
            if (waiterid !== '') {
                await pool.query('delete from shifts where waiterid = $1', [waiterid]);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return {
        allShifts,
        allWaiters,
        allDays,
        waiter,
        addShifts,
        clearOld
    };
};
