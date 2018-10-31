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
