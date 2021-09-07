# Welcome to Reflect!

![](https://i.imgur.com/F6nDmNn.png)

Reflect is an app within the mental health space, inspired by a notable positive psychology course called The Science of Wellbeing with design inspired by Zoho notebooks and Penzu. With Reflect, the user engages in weekly rewirements designed to increase one's happiness and build more productive habits. 

### Live Link: [*Reflect within yoursrelf*](https://reflect-in.herokuapp.com/)

## Technologies
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=333333" /></a>
* <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL&logoColor=white" /></a>
* <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"></a>
* <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
* <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>
* <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" /></a>
* <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" /></a>
* <a href="https://www.heroku.com/home"><img src="https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white" /></a>

## Features

### User log in and sign up
![](https://i.imgur.com/zpgALhj.png)
![](https://i.imgur.com/op0NuY6.png)

### View user journals and delete journals
![](https://i.imgur.com/6c7ED6k.png)
![](https://i.imgur.com/o37Pxz0.png)

### Create a journal
![](https://i.imgur.com/hTBAWf0.png)

### Edit a journal
![](https://i.imgur.com/pxNKFMH.png)

### View journal entries and create an entry
![](https://i.imgur.com/wpkRqoQ.png)
![](https://i.imgur.com/wpkRqoQ.png)

### Edit and delet
![](https://i.imgur.com/hASLsco.png)

# Challenges 
At first, it was difficult for me to figure out how each modal and page affect the states of of one 
another. However, I'ver realized how strong of a tool react hooks like useState and useEffect 
can make the rendering of the page seamless. 

# Stretch Goals 
* Search bar
* Favorites 


## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


