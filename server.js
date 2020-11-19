const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3010;
const helpers = require('./utils/helpers');
const hbs = exphbs.create({helpers});

// Sets Handlebars as the default template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const sess = {
  secret: 'Supuer secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});