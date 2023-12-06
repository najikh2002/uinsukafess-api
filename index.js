// server.js
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');


const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    return res.status(200).json({message: "Selamat datang di tweet-post-api by Hizbullah Najihan"});
});

app.post('/createpost', async (req, res) => {
  const tweet = await req.body.text; 
  console.log(tweet);
  const response = await createPost(tweet);
  res.json(response);
});

const createPost = (tweet) => {
    let data = JSON.stringify({
    "text": `${tweet}`
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.twitter.com/2/tweets',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'OAuth oauth_consumer_key="Ay0dvrzdqdIBTAX02PGetpvyZ",oauth_token="1730713826360987648-qP3FN0gNXlVxQZi9OQgAQ6gD928JE0",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1701858748",oauth_nonce="rfpcdlG9zFM",oauth_version="1.0",oauth_signature="RwzvYlLwx3Vr7r1WZto6BbGhbVk%3D"', 
          'Cookie': 'guest_id=v1%3A170084276834714652; guest_id_ads=v1%3A170084276834714652; guest_id_marketing=v1%3A170084276834714652; personalization_id="v1_LdPRUHpKtFK6/BMK0+NYkw=="'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

};
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
