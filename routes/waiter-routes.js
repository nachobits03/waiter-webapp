module.exports = function (factory, waiterdb) {
    function waiterLog (req, res) {
        res.render('waiter-login');
    }

    function home (req, res) {
        res.render('home');
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
    function shifts (req, res) {
        let waiter = req.params.waiter;
        res.render('waiter-shifts',
            { waiter });
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

    function update (req, res) {
        let waiter = req.body.waiter;
        let mon = req.body.mon;
        let tues = req.body.tues;
        let wed = req.body.wed;
        let thur = req.body.thur;
        let fri = req.body.fri;
        let sat = req.body.sat;
        let sun = req.body.sun;
        let days = [mon, tues, wed, thur, fri, sat, sun];
        for (let day of days) {
            if (day !== undefined) {
                factory.addShift(waiter, day);
            }
        }
        console.log(days);
        res.redirect('/shifts/' + waiter);
    }

    return {
        waiterLog,
        home,
        days,
        shifts,
        logged,
        update
    };
};
