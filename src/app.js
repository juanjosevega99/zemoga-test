const express = require('express');
const cors = require('cors');

const ProfileRouter = require('./routes/profile.routes');

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World at Zemoga!')
  });

  ProfileRouter(app);
  return app;
}

module.exports = createApp;