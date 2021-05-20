const express = require('express');
const ProfileService = require('../services/profile.services');

const ProfileRouter = (app) => {
  const router = express.Router();
  app.use('/api/profile', router);

  const service = new ProfileService();

  router.get('/', async (req, res) => {
    const profileInfo = await service.getProfile()
    res.status(200).json(profileInfo);
  });
  
  router.get('/tweets', async (req, res) => {
    const tweets = await service.getTweets()
    res.status(200).json(tweets);
  });

  router.put('/:profileId', async (req, res) => {
    const { body, params } = req;
    const updateProfile = await service.updateProfile(params.profileId, body)
    res.status(200).json(updateProfile);
  });
}

module.exports = ProfileRouter;