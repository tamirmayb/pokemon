## Ceezr Pokemon backend coding assignment

### Author: Tamir Mayblat

### Backend (Typescript - MongoDB)

### How to run this project?

#### 1. Install dependencies

```bash
$ npm install
```

#### 3. Run in developement mode

```bash
$ npm start run
```

#### API will run from localhost:9001/pokemon

#### Please note that the db in use in Mongodb atlas. All Pokemons from the CSV have already been uploaded.

#### Please use Postman or any other similar tool to trigger the api:

* Post -> /login - must be done before any other action can be done please send key value as body parameters use ```x-www-form-urlencoded```
  * [localhost:9001/pokemon/login]()
* The keys and values for the login are username: _user_ and password: _password_. 
* Once logged in a token will be returned please use it in authorization as a bearer token.
  * Note  that the token expires after 1 hour. 

-----------
* Get -> / - Returns all pokemons with shorten data. 
  * [localhost:9001/pokemon/]()
* Get /{id} - Returns a single pokemon by id (currently 1-800). 
  * [localhost:9001/pokemon/7]()
* Put /{id} - Updates a single pokemon by id. 
  * [localhost:9001/pokemon/7]() (pokemon data should be sent in body as json)
* Get /fight/:pokecount - Begins a Pokemon Battle (bonus part).     
  * [localhost:9001/pokemon/fight/8]() - starts a fight of 8 pokemons see explanation below.  

----------
#### Assumptions:
* The ```/fight``` end point logic is a bit different than the one described on the question: 
  * You first need to choose an **even number** which the end point takes as a parameter.
  * It then selects pokemons in the amount of the parameter **randomly** and splits them into 2 lists.
  * The process continues by iterating over the lists with every member of each list fights once as an attacker and once as a defender.
  * The pokemon who got the most damage loses the match (this could also be a bit of a different logic than what you would expect but seemed more interesting that way :) )
  * The winners are again split into 2 lists and fight each other until only one winner remains - The winner of the fight.
  * Each match outcome is returned from the api as well as the winner as a list of strings which could be used later by ui...

#### TODOs:
* Add logger ?
* Improve error messages
* Tests are missing for now due to an issue with testing repositories installations.

Please let me know if you have any questions.
Thank you!