
const mongoose = require('mongoose');
const express = require('express');
var session = require('express-session');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const User = require('./User');
const Transaction = require('./Transaction')

//const Transaction = require('./data');
//const Record = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://admin:lxt991206@cluster0-vsyar.mongodb.net/test?retryWrites=true&w=majority';


// connects our back end code with the database
mongoose.connect(dbRoute, {useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(session(
  {
    secret:'something',
    saveUninitialized: true,
    resave: true

  }
));

var sess;

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  User.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { name, update } = req.body;
  User.findOneAndUpdate(name, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  User.findByIdAndDelete(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new User();

  const { name, email } = req.body;

  if (!name || !email) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.name = name;
  data.email = email;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/authentication',(req,res) => {
  sess = req.session;
  const username = req.body;
  User.findOne(username, function(err,user){
    if(err || user == null){
      console.log(err);
      return res.json({success: false});
    }
    else{
      console.log(user);
      //sess.name = name;
      return res.json({ success: true });
    }
  });



});

router.get('/dashboard',(req,res) => {
  if (err) return res.json({ success: false, error: err });
  return res.json({ success: true });
});

router.get('/newRecord',(req,res) => {
  if (err) return res.json({ success: false, error: err });
  return res.json({ success: true });
});

router.post('/putTransaction', (req, res) => {
  let data = new Transaction();

  const { owner, payer, amount, sharedBy, displayShared, isresult, comment } = req.body;

  if (!owner || !payer || !sharedBy) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.owner = owner;
  data.payer = payer;
  data.amount = parseInt(amount,10);
  data.sharedBy = sharedBy;
  data.displayShared = displayShared;
  console.log(sharedBy);
  data.isresult = isresult;
  data.comment = comment;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get('/getTransaction', (req, res) => {
  Transaction.find((err, transactions) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, transactions: transactions });
  });
});


// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
