const express = require(`express`);
const path = require(`path`);
const morgan = require(`morgan`);
const nunjucks = require(`nunjucks`);
const Emp = require("./schemas/employees");

const connect = require("./schemas");
const { SSL_OP_NETSCAPE_CA_DN_BUG } = require("constants");

const app = express();
app.set(`port`, process.env.PORT || 3002);
app.set(`view engine`, `html`);

nunjucks.configure(`views`, {
  express: app,
  watch: true,
});

connect();

app.use(morgan(`dev`));
app.use(express.static(path.join(__dirname, `public`)));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res, next) => {
  try {
    const employees = await Emp.find({});

    console.log(employees);
  } catch (e) {
    console.log(e);
  }
  res.send("<h1>Hello MongoDB</h1>");
});

app.get("/team/solution-dev", async (req, res, next) => {
  try {
    const employees = await Emp.find({ team: `솔루션개발팀` });

    console.log(employees);
  } catch (e) {
    console.log(e);
  }
  console.log("SOLUTION DEV");

  res.send("<h1>Hello SOLUTION DEV</h1>");
});
app.get("/team/taq-dev", async (req, res, next) => {
  try {
    const employees = await Emp.find({ team: `기술개발팀` });

    console.log(employees);
  } catch (e) {
    console.log(e);
  }
  console.log("TEQ DEV");

  res.send("<h1>Hello TEQ DEV</h1>");
});
app.get("/team/solution-desgine-dev", async (req, res, next) => {
  try {
    const employees = await Emp.find({ team: `솔루션디자인팀` });

    console.log(employees);
  } catch (e) {
    console.log(e);
  }
  console.log("SOLUTION DESGINE DEV");

  res.send("<h1>Hello SOLUTION DESGINE DEV</h1>");
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} Not exist Router`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== `production` ? err : {};
  res.status(err.status || 500);
  res.render(`error`);
});

app.listen(app.get(`port`), () => {
  console.log(app.get(`port`), `Hole Position This`);
});
