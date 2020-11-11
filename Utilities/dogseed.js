
const fetch = require('node-fetch');

// fetch data from dogs API
fetch('https://api.thedogapi.com/v1/images/search?limit=100', {
    headers: {
        "x-api-key": "9b591ab9-d9d1-4d0e-8a37-1223db72bed2"
    }
})
  .then(response => response.json())
  .then(data => console.log(data));
