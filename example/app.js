var http       = require('http'),
    port       = process.env.PORT || 3000,
    request    = require('./node_modules/node-quickbooks/node_modules/request'),
    qs         = require('querystring'),
    util       = require('./node_modules/node-quickbooks/node_modules/util'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session    = require('express-session'),
    express    = require('express'),
    app        = express(),
    QuickBooks = require('../index'),
    analysis   = require('./analysis-engine.js');


// Generic Express config
app.set('port', port)
app.set('views', 'views')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser('brad'))
app.use(session({resave: false, saveUninitialized: false, secret: 'smith'}));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
})

// INSERT YOUR CONSUMER_KEY AND CONSUMER_SECRET HERE

var consumerKey    = 'qyprdHEA5JFpn0Cl0cOZF1ES76SBZj',
    consumerSecret = 'aCX3trBtfF7dnRlpqLl07fXQdJnRpp1hgjLjtHqz';

app.get('/',function(req,res){
  res.redirect('/start');
})

app.get('/start', function(req, res) {
  res.render('intuit.ejs', {locals: {port:port, appCenter: QuickBooks.APP_CENTER_BASE}})
})

app.get('/requestToken', function(req, res) {
  var postBody = {
    url: QuickBooks.REQUEST_TOKEN_URL,
    oauth: {
      callback:        'http://localhost:' + port + '/callback/',
      consumer_key:    consumerKey,
      consumer_secret: consumerSecret
    }
  }
  request.post(postBody, function (e, r, data) {
    var requestToken = qs.parse(data)
    req.session.oauth_token_secret = requestToken.oauth_token_secret
    //
    //
    //console.log(requestToken)
    res.redirect(QuickBooks.APP_CENTER_URL + requestToken.oauth_token)
  })
})

app.get('/callback', function(req, res) {
  var postBody = {
    url: QuickBooks.ACCESS_TOKEN_URL,
    oauth: {
      consumer_key:    consumerKey,
      consumer_secret: consumerSecret,
      token:           req.query.oauth_token,
      token_secret:    req.session.oauth_token_secret,
      verifier:        req.query.oauth_verifier,
      realmId:         req.query.realmId
    }
  }
  request.post(postBody, function (e, r, data) {
    var accessToken = qs.parse(data)
    //console.log(accessToken)
    //console.log(postBody.oauth.realmId)

    // save the access token somewhere on behalf of the logged in user
    qbo = new QuickBooks(consumerKey,
                         consumerSecret,
                         accessToken.oauth_token,
                         accessToken.oauth_token_secret,
                         postBody.oauth.realmId,
                         true, // use the Sandbox
                         true); // turn debugging on
    
    function beautify(JSONobj) {
      var beautifiedResult = JSON.stringify(JSONobj);
      console.log(beautifiedResult);
    } 
    // grab balance sheet
    qbo.reportBalanceSheet(function(_, balanceSheet) {
      console.log(JSON.stringify(balanceSheet));
    })
    // grab profit and loss statement
    /*qbo.reportProfitAndLoss(function(profitAndLossSheet) {
      console.log(profitAndLossSheet);
    })*/
  })
  res.send('<!DOCTYPE html><html lang="en"><head></head><body><script>window.opener.location.reload(); window.close();</script></body></html>');
  /*if (balancesheet) {
    console.log("redirecting to web app");
    window.location.href="./app/index.html";
  } */
})

