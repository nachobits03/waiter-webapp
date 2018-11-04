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
        let waiter = req.waiter.params;
        res.render('waiter-shifts',
        waiter);
    }

    function logged (req, res) {
        let name = req.body.waiter;
        console.log(name)
        res.redirect('/shifts/' + name);
    }

     function update (req, res){
         res.redirect
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
