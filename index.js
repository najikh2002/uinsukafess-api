// server.js
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = 8000;

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {

    return res.status(200).json({message: `${process.env.guest_id}`});
});

app.post('/createpost', async (req, res) => {
  const tweet = req.body.text; 
  const response = await createPost(tweet);
  res.json(response.data);
});

const createPost = async (tweet) => {
    const data = JSON.stringify({
    "text": `${tweet}`
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.twitter.com/2/tweets',
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'OAuth oauth_consumer_key="Ay0dvrzdqdIBTAX02PGetpvyZ",oauth_token="1730713826360987648-qP3FN0gNXlVxQZi9OQgAQ6gD928JE0",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1701603997",oauth_nonce="88lAeWDVnxb",oauth_version="1.0",oauth_signature="pUtg1s2qEB0%2BLggi%2FuaaGkGMpoU%3D"', 
        'Cookie': 'guest_id=v1%3A170084276834714652; guest_id_ads=v1%3A170084276834714652; guest_id_marketing=v1%3A170084276834714652; personalization_id="v1_LdPRUHpKtFK6/BMK0+NYkw=="'
      },
    data: data
  };

  return axios.request(config);
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
