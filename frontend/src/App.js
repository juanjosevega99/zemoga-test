import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tweets, setTweets] = useState([]);
  const [profile, setProfile] = useState({});
  const [title, setTitle] = useState('');

  useEffect(() => {
    getTweets();
    getProfile();
  }, []);

  async function getProfile() {
    const infoProfile = await axios.get('http://localhost:4000/api/profile');
    setProfile(infoProfile.data[0]);
  }

  async function getTweets() {
    const fiveTweets = await axios.get(
      'http://localhost:4000/api/profile/tweets'
    );
    setTweets(fiveTweets.data);
  }

  async function updateData() {
    const newProfile = { title };
    const profileUpdated = await axios.put(
      `http://localhost:4000/api/profile/${profile._id}`,
      newProfile
    );
    console.log(profileUpdated);
    setProfile(profileUpdated.data);
  }

  return (
    <div>
      <div className="container">
        <div className="col1">
          <div className="photo">
            <img className="image" alt="profile-logo" src={profile.image_url} />
          </div>
          <div className="background">
            {tweets.map((tweet, index) => {
              return (
                <div key={index}>
                  <p>{tweet.text}</p>
                  <p>{tweet.username}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col2">
          <p>{profile.title}</p>
          <input value={title} placeholder='Update Name' onChange={e => setTitle(e.target.value)}></input>
          <button type="button" onClick={updateData}>
            Update
          </button>
          {/* <div>
            <p>{profile.twitter_user_name}</p>
          </div> */}
          <div className="about">
            <p>{profile.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
