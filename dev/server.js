/* eslint-disable strict */
'use strict';

const Express = require('express');

const app = new Express();
const port = 3000;

app.use('/', Express.static(__dirname));

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
