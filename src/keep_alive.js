const express = require('express');
const server = express();

server.all('/', (req, res) => {
  res.send('bot is alive!')

});
function keepAlive() {
  server.listen(3000, () => {
    console.log('Server is now ready ! |' + Date.now());
  })
}
module.exports = keepAlive;