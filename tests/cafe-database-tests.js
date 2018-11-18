const assert = require('assert');
const WaiterFactory = require('../src/waiter-factory.js');
const WaiterDb = require('../src/waiterdb.js');
const pg = require('pg');

// const connectionString = process.env.DATABASE_URL || 'postgresql://nachobits:1997@localhost:5432/cafe';
// const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/cafe';
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/cafe';
const Pool = pg.Pool;
const pool = new Pool({
    connectionString
});

const db = WaiterDb(pool);
const factory = WaiterFactory(db);

describe('The waiter web app queries for database', function () {
    beforeEach(async function () {
        await pool.query('delete from shifts');
    });

    it('Should return all days of the week, understaffed and an empty list of waiters', async function () {
        let weekDetails = await factory.sort();
        let days = weekDetails.map(day => day.day)
        let status = weekDetails.map(shift => shift.status)
        let waiters = weekDetails.map(waiter => waiter.waiters)
        assert.deepEqual(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], days);
        assert.deepEqual(['understaffed', 'understaffed', 'understaffed', 'understaffed', 'understaffed', 'understaffed', 'understaffed'], status);
        assert.deepEqual([[], [], [], [], [], [], []], waiters);
    });

    it('Checks whether waiter name exists in database', async function () {
        assert.equal(true, await factory.waiterCheck('nat'))
        assert.equal(false, await factory.waiterCheck('jackson'))
    });

    it('add waiter shifts for the week', async function () {
        await factory.addShift('nat', 1)
        await factory.addShift('nat', 3)
        await factory.addShift('nat', 5)
        let weekDetails = await factory.sort();
        let waiters = weekDetails.map(waiter => waiter.waiters)
        assert.deepEqual([['nat'], [], ['nat'], [], ['nat'], [], []], waiters);
    });

    it('joins all waiter and days on table', async function () {
        await factory.addShift('nat', 1)
        await factory.addShift('sandy', 1)
        await factory.addShift('john', 1)
        let shifts = await db.allShifts();
        let waiters = shifts.map(waiter => waiter.waiter)
        let workdays = shifts.map(workday => workday.workday)
        assert.deepEqual(['nat', 'sandy', 'john'], waiters);
        assert.deepEqual(['monday', 'monday', 'monday'], workdays);
    });

    it('displays all waiters and their list id in the database', async function () {
       let allWaiters = await db.allWaiters(); 
        let waiters = allWaiters.map(waiter => waiter.waiter)
        let waiterids = allWaiters.map(waiterid => waiterid.waiterid)
        assert.deepEqual(['john', 'sandy', 'jack', 'nat'], waiters)
        assert.deepEqual(['1', '2', '3', '4'], waiterids)
    });

    it('displays all days in database', async function () {
        let allDays = await db.allDays(); 
         let workdays = allDays.map(day => day.workday)
         assert.deepEqual(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], workdays)

     });

     it('gets waiterid of waiter in database', async function () {
         let waiter = await db.waiter('nat');
         let waiterid = waiter.waiterid 
      assert.equal(4, waiterid)

     });


    after(function () {
        pool.end();
    });
});

