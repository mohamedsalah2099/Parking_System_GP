const express = require ('express');
const app = express ();
const port = 3000;
const fetch = require ('node-fetch');
var bodyParser = require ('body-parser');
var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.post ('/', async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.body);
  try {
    await fetch ('https://beta.masterofthings.com/PostAppData', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify ({
        AppInfo: {
          AppId: '42',
          SecretKey: 'ccYteg39845bG7IU1624299719318signUp_form',
        },
        AppData: [
          {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          },
        ],
      }),
    });
    console.log (req.body);
  } catch (e) {
    console.log (e);
  }
  res.send ('Hello World!');
});

app.listen (port, () => {
  console.log (`Example app listening at http://localhost:${port}`);
});
