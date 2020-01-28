//variables from html

 
  //Node Modules
  const inquirer = require('inquirer');
  const fetch = require('node-fetch');
  const fs = require('fs');
  convertFactory = require('electron-html-to');
  //const pdf = require('html-pdf');
  const path = require('path'); 
  const { app, BrowserWindow } = require('electron')

  const html = fs.readFileSync('./profile.html', 'utf8');
  const clientID = 'Iv1.410f841289919669';
  const clientSecret =  '72eca788f56a822b6f72561d25837e13075fba32'; 
  const options = { 
    "height": "10.5in",        
    "width": "8in",  
    // "format": "letter"
  };
yellowArray = ['rgb(249 166 2)', 'rgb(252 226 5)', 'rgb(252 244 163)'];
blueArray = ['rgb(101, 24, 198)', 'rgb(15 82 186)', 'rgb(137 207 240)'];
redArray = ['#420D09', '#D30000', '#FA8072', '#FA8072'];
greenArray = ['rgb(11 102 35)', 'rgb(76 187 23)', 'rgb(208 240 192)'];





  function userProfileHTML (data, response) {
    var htmlPage = 
  `<!DOCTYPE html>
  <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <style> 
    body {
      -webkit-print-color-adjust:exact !important;
      background-color: ${response[0]};
    }
    .main {
      height: 100%;
      background-color:${response[0]};
    }
    .profile-img {
      border-radius: 50%;
      position: absolute;
      bottom: 60%;
      max-width: 220px;
      margin: 0 auto;
      left:17%;
      border: 6px solid ${response[2]}; 
    }
    h5 {
      padding-top: 100px;
    }
    .top-container {
      margin: 150px auto;
      max-width: 1000px;
      display: flex;
      flex-direction: row ;
      justify-content: center;
      align-items: center;
      border: 7px solid ${response[2]};
      margin-bottom: 0px;
      background-color: ${response[1]};
    }
    .card {
      width: 300px; 
      border: 3px grey response[2];
      background-color: ${response[2]} 
    }
    .badge {
      padding: 3% 6%;
      font-size: larger;
      font-weight: normal;
      display: inline; 
      text-align: center;
    }
    .bottom-container {
      display: flex; 
      justify-content: space-around;
      flex-wrap: wrap;
      max-width: 1000px;
      margin: 0 auto;
      background-color: ${response[1]};
      border: 7px solid ${response[2]}
    }
    .column {
      display: flex; 
      justify-content: center;
      flex-direction: column;
    }
    .flex-item {
      width: 250px;
      padding: 10px 20px;
      height: 150px;
      margin-top: 20px;
      line-height: 150px;
      color: white;
      font-weight: bold;
      font-size: 1em;
      text-align: center;
      margin-bottom: 20px;
      border-radius: 25%;
      display: flex; 
      flex-direction: column;
      justify-content: center;
      background-color: ${response[2]}
    }
    .badge {
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      font-size: 1.5em; 
      font-weight: bolder;
      overflow: hidden;
    }
    </style>
  </head>
  <body>
    <div class="" id="main">
      <div class="top-container">
        <div class="card" style="width: 23rem;">
          <img src="${data.avatar_url}" class="profile-img card-img-top" alt="profile-pic">
          <div class="card-body">
            <h5 class="card-title use">${data.login}</h5>
            <p class="card-text"><a class="location" href="">${data.location}</a></p>
            <p class="card-text"><a class='profile: ' href=""></a>Profile: ${data.html_url}</p>
            <p class="card-text"><a class='bio:' href=""></a>${data.bio}</p>
          </div>
        </div>
      </div>   
      <div class="bottom-container">
        <div class="column">
          <div class="flex-item">
            <p class="badge followers">Repos: ${data.public_repos}</p>
          </div>
          <div class="flex-item">
            <p class="badge following">Stars:${data.public_gists} </p>
          </div>
        </div>
        <div class="column">
          <div class="flex-item">
            <p class="badge repos">Following: ${data.following}</p>
          </div>
          <div class="flex-item">
            <p class="badge blog">Followers: ${data.followers}</p>
          </div>
        </div> 
      </div>
    </div>
  </body>
  <html lang="en">`
  return htmlPage 
}




  // const generateHTML = var exporter = new ElectronPDF()
  // exporter.on('charged', () => {
  //     //Only start the express server once the exporter is ready
  //     app.listen(port, hostname, function() {
  //         console.log(`Export Server running at http://${hostname}:${port}`);
  //     })
  // })
  

  
  // const generatePDF = (userProfileHTML) => {

  //   pdf.create(userProfileHTML, options).toFile('./resume.pdf', function(err, res) {
  //     if (err) return console.log(err);
  //     console.log(res); 
  //   });
  // }`

  const fetchUser = async (user, response) => {
    const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${clientID}&client_secret=${clientSecret}`)
    const data = await api_call.json()
    // console.log(data); 
    // console.log(`github username is ${data.login}, profilePic is ${data.avatar_url}, user Profile is ${data.html_url}, 
    // blog is ${data.blog}, public repos is ${data.public_repos}, number of followers is ${data.followers}, number of following ${data.following}, user location ${data.location}, bio is ${data.bio} `)
    //generateHTML(data, response);

    var conversion = convertFactory({
      converterPath: convertFactory.converters.PDF
    });
     
    conversion({ html:userProfileHTML(data, response) }, function(err, result) {
      if (err) {
        return console.error(err);
      }
     
      console.log(result.numberOfPages);
      console.log(result.logs);
      result.stream.pipe(fs.createWriteStream('./username.pdf'));
      conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
    });
  };


  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your Github user name?",
        name: "username"
      },
      {
        type: "list",
        message: "What is your favorite color?",
        name: "color",
        choices: [
          'green', 'blue','red', 'yellow'
        ]
      },
    ])
  .then(async function(response) {

      //console.log(`Your username is ${response.username}, fav color is ${response.password}`)
    if(response.color === 'yellow'){
      const user = await fetchUser(response.username,yellowArray); 
    }else if(response.color === 'green'){
      const user = await fetchUser(response.username,greenArray); 
    }else if(response.color === 'red'){
      const user = await fetchUser(response.username,redArray); 
    }else {
      const user = await fetchUser(response.username,blueArray); 
    }
      //const user = await fetchUser(response.username,response.color); 
     // const favColor = response.color; 
      //console.log('got the corresponding github user for that username', user);
  });

