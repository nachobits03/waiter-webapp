module.exports = function (factory, waiterdb, app) {

    function home (req, res) {
        res.render('login', {layout: 'manager'});
    }

    async function days (req, res) {
        let allShifts = await factory.sort();
        let allDays = await waiterdb.allDays();

        // console.log(await factory.sort())
        res.render('days', {
            allShifts,
            allDays
        });
    }
    async function shifts (req, res) {
        let waiter = req.params.waiter;
        let shifts = await factory.shiftView(waiter);
        // console.log(shifts);
        res.render('waiter-shifts',
            { waiter,
                shifts
            });
    }

    async function logged (req, res) {
        let name = req.body.waiter;
        // console.log(name)
        let checker = await factory.waiterCheck(name);
        if (checker === true) {
            res.redirect('/shifts/' + name);
        } else {
            res.redirect('/waiter-login');
        }
    }

    async function update (req, res) {
        let waiter = req.params.waiter;
        let mon = req.body.mon;
        let tues = req.body.tues;
        let wed = req.body.wed;
        let thur = req.body.thur;
        let fri = req.body.fri;
        let sat = req.body.sat;
        let sun = req.body.sun;
        let days = [mon, tues, wed, thur, fri, sat, sun];
        console.log('hereeee', waiter);
        await factory.clearOld(waiter);
        for (let day of days) {
            if (day !== undefined) {
                await factory.addShift(waiter, day);
            }
        }
        console.log(days);
        res.redirect('/shifts/' + waiter);
    }

    async function reset (req, res) {
        try {
            await waiterdb.reset();
            res.redirect('/days');
        } catch (err) {
            console.error(err);
        }
    }

    async function add (req, res) {
        try {
           
            res.render('waiter-create');
        } catch (err) {
            console.error(err);
        }
    }

    async function tester(req, res){
        try{
            req.session.user = "nath"
            let currUser = (req.session.user)
            res.render('test', {layout: 'manager', currUser});

        }catch(err){
            console.error(err)
        }
    }

    return {
        home,
        days,
        shifts,
        logged,
        update,
        reset,
        add,
        tester
    };
};
