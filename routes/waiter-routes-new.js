const { use } = require("express/lib/application");

module.exports = (factory, db, app) => {

    async function waiterLogin (req, res) {
        res.render('login', {layout:'landing'});
    }

    async function signIn(req, res){
        let username = req.body.username;
        let password = req.body.password;
        console.log(username + " " + password);

        let state = true;

        if(state){
            res.redirect('/waiter/' + username)
        }
        
        
    }

    async function waiterHome(req, res){
        res.render('waiter-landing', {layout:'waiter'})
    }

    return {
        waiterLogin,
        signIn,
        waiterHome
    };

}