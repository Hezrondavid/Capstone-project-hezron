const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Node app is running at http://localhost:${PORT}`);
});
