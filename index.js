const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const WaiterRoutes = require('./routes/waiter-routes');
const waiterData = require('./services/waiterData')
const pg = require('pg');
const app = express();

const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/cafe';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

// Factory Function instances
const waiterdb = waiterData(pool);
const route = WaiterRoutes(waiterdb);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
    // helpers: {
    //     'shifts':
    //     function () {
    //         if (this.selected) {
    //             return 'shifts';
    //         }
    //     }
    // }
}));

app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.get('/', route.home);

app.get('/days', route.days);

app.get('/waiter-login', route.waiterLog);

app.get('/shifts/:waiter', route.shifts);

app.post('/waiter-logged', route.logged);

app.post('/shifts-update', route.update);

let PORT = process.env.PORT || 3005;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
