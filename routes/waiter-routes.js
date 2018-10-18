module.exports = function () {
    function waiterLog (req, res) {
        res.render('waiter-login');
    }

    function home (req, res) {
        res.render('home');
    }

    function days (req, res) {
        res.render('days');
    }
    function shifts (req, res) {
        res.render('waiter-shifts');
    }

    function logged (req, res) {
        let name = req.body.waiter;
        console.log(name)
        res.redirect('/waiter/' + name);
    }
    return {
        waiterLog,
        home,
        days,
        shifts,
        logged
    };
};
