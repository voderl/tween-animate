const express = require('express');
const path = require('path');
const http = require('http');
const reload = require('reload');

const app = express();

app.set('port', 3000);
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'));
});
app.get('/tween-animate.js', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../dist/tween-animate.umd.js'));
});
app.get('/main.js', function (req, res) {
  res.sendFile(path.resolve(__dirname, './main.js'));
});
app.use(express.static(path.resolve(__dirname, './images')));
const server = http.createServer(app);

reload(app)
  .then((reloadReturned) => {
    server.listen(app.get('port'), function () {
      console.log('Web server listening on port ' + app.get('port'));
    });
  })
  .catch((err) => {
    console.error(
      'Reload could not start, could not start server/sample app',
      err,
    );
  });
