const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Export the app for testing
module.exports = app;

// Start the server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Node app is running at http://0.0.0.0:${PORT}`);
  });
}
