//variables from html
 
  //Node Modules
  const inquirer = require('inquirer');
  const fs = require('fs');
  convertFactory = require('electron-html-to');
  const path = require('path'); 
  const { app, BrowserWindow } = require('electron')
  const axios = require('axios');
  const html = fs.readFileSync('./profile.html', 'utf8');
  //colors
yellowArray = ['rgb(249 166 2)', 'rgb(252 226 5)', 'rgb(252 244 163)'];
blueArray = ['rgb(101, 24, 198)', 'rgb(15 82 186)', 'rgb(137 207 240)'];
redArray = ['#420D09', '#D30000', '#FA8072', '#FA8072'];
greenArray = ['rgb(11 102 35)', 'rgb(76 187 23)', 'rgb(208 240 192)'];

  //HTML and CSS
  function userProfileHTML (data, response, starsCounter) {
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
    #main {
      position: absolute; 
      bottom: 200px;
      height: 1400px;
      width: 1200px;
      background-color:${response[0]};
    }
    .profile-img {
      border-radius: 50%;
      position: absolute;
      bottom: 70%;
      max-width: 220px;
      margin: 0 auto;
      left:17%;
      border: 6px solid ${response[2]}; 
    }
    h2 {
      padding-top: 130px;
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
    .card-text {
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
      font-size: 1.5em; 
    }
    .badge {
      padding: 3% 6%;
      font-size: larger;
      font-weight: normal;
      display: inline; 
      text-align: center;
    }
    .bottom-container {
      padding-top: 30px;
      padding-bottom: 30px; 
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
      margin-top: 40px;
      margin-bottom: 40px;
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
      font-size: 2em; 
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
            <h2 class="card-title use">${data.login}</h2>
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
            <p class="badge following">Stars:${starsCounter} </p>
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


//Fetch User 
const fetchUser = (user, color) => {
  let starsCounter = 0; 
  //console.log(user)
  axios
  .get(`https://api.github.com/users/${user}/repos`)
  .then((res) => {
    const repos = res.data;
    var data = repos[1].owner; 
    repos.forEach(repo => {
      starsCounter += parseInt(repo.stargazers_count);
    })
    axios
    .get(`https://api.github.com/users/${user}`)
    .then((res) => {
      console.log(res.data);
      const data = res.data; 
   
  var conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
  });
     
  conversion({ html:userProfileHTML(data, color, starsCounter) }, (err, result) => {
      if (err) {
        return console.error(err);
      }
      result.stream.pipe(fs.createWriteStream('./username.pdf'));
      conversion.kill();
      });
    })
  })
}
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
    if(response.color === 'yellow'){
      const user = await fetchUser(response.username,yellowArray); 
    }else if(response.color === 'green'){
      const user = await fetchUser(response.username,greenArray); 
    }else if(response.color === 'red'){
      const user = await fetchUser(response.username,redArray); 
    }else {
      const user = await fetchUser(response.username,blueArray); 
    }   
  })