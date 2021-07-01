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
});


// Get Sensor Data //
app.post ('/getSensor', async (req, res) => {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header (
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  try {
    await fetch ('https://beta.masterofthings.com/GetSensorReadingValueList', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify ({
        SensorId: 236,
        Limit: 1,
        OrderBy: [
          {
            reading: 'TimeStamp',
            orderType: 'desc',
          },
        ],
        Auth: {
          DriverManagerId: 'iTi_2021_Parking',
          DriverManagerPassword: 'iTi_2021_Parkingpass',
        },
      }),
    })
      .then (res => res.json ())
      .then (value => {
        if (value.Result) {
          console.log (value.Result[0].currentNearnessLevel);
          res.json (value.Result[0].currentNearnessLevel);
        } else {
          console.log ('Slot Not Found');
          res.json ('Slot Not Found');
        }
      });
  } catch (e) {
    console.log (e);
  }
});



// Post Sensor Data //
app.post ('/postSensor', async (req, res) => {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header (
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  try {
    await fetch ('https://beta.masterofthings.com/PostSensorData', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify ({
        Package: {
          SensorInfo: {
            SensorId: req.body.sensorID,
          },
          SensorData: {
            appVersion: 1,
            phoneVersion: 2,
            captureTime: 1,
            currentNearnessLevel: req.body.sensorStatus,
          },
        },
        Auth: {
          DriverManagerId: "iTi_2021_Parking",
          DriverManagerPassword: "iTi_2021_Parkingpass",
        },
      }),
    })
    // console.log(req.body.sensorID);
    console.log("Sensor Data Sent");
    res.json("Sensor Data Sent")
  } catch (e) {
    console.log (e);
  }
});



// Get Parking Data //
app.post ('/getParking', async (req, res) => {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header (
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  try {
    await fetch ('https://beta.masterofthings.com/GetSensorReadingValueList', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify ({
        SensorId: 255,
        Limit: 1,
        OrderBy: [
          {
            reading: 'TimeStamp',
            orderType: 'desc',
          },
        ],
        Auth: {
          DriverManagerId: 'iTi_2021_Parking',
          DriverManagerPassword: 'iTi_2021_Parkingpass',
        },
      }),
    })
      .then (res => res.json ())
      .then (value => {
        if (value.Result) {
          console.log (value.Result[0]);
          res.json (value.Result[0]);
        } else {
          console.log ('Not Found');
          res.json ('Not Found');
        }
      });
  } catch (e) {
    console.log (e);
  }
});


app.listen (port, () => {
  console.log (`Listening at http://localhost:${port}`);
});

