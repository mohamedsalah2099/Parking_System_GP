const express = require ('express');
const app = express ();
const port = 3000;
const fetch = require ('node-fetch');
var bodyParser = require ('body-parser');
var cors = require ('cors');

app.use (bodyParser.urlencoded ({extended: true}));
app.use (bodyParser.json ());
app.use (cors ());

// Sign-Up Route ///
app.post ('/', async (req, res) => {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header (
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
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

// Login Route //
app.post ('/login', async (req, res) => {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header (
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
    
  );
  try {
    await fetch ('https://beta.masterofthings.com/GetAppReadingValueList', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        "Access-Control-Allow-Origin" : "*", 
"Access-Control-Allow-Credentials" : true 
      },
      body: JSON.stringify ({
        AppId: 43,
        Limit: 10,
        ConditionList: [
          {
            Reading: 'password',
            Condition: 'e',
            Value: req.body.password,
          },
          {
            Reading: 'email',
            Condition: 'e',
            Value: req.body.email,
          },
        ],
        Auth: {
          Key: 'JKkjZahTZ8Crw2dk1624335681771users',
        },
      }),
    })
      .then (res => res.json())
      .then (value => {
        if(value.Info.NumberOfReadings)
        {
          console.log (value.Info.NumberOfReadings)
          res.json(JSON.stringify(value))
        }
        else{
          console.log("Not Found");
          res.json("Not Found")
        }
      });
  } catch (e) {
    console.log (e);
  }

  // res.send("done");
});

app.listen (port, () => {
  console.log (`Listening at http://localhost:${port}`);
});

