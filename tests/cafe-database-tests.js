const assert = require('assert');
const WaiterFactory = require('../src/waiter-factory.js');
const WaiterDb = require('../src/waiterdb.js');
const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/cafe';
// const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/cafe';
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

    it('Should return all waiters available for each day', function () {
        assert.deepEqual(['john', 'sandy', 'jack', 'nat'], factory.allWaiters());
    });

// it("Should return add monday tuesday and friday as shifts for nat"){
//     assert.equal(["monday", "tuesday", "friday"])
// }

    after(function () {
        pool.end();
    });
});
