const settings = require("./settings"); // settings.json
const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];

const knex = require("knex")({
  client: 'pg',
  connection: { 
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
  }
});
knex('famous_people')
.insert({first_name: firstName, last_name: lastName, birthdate: birthDate})
.then((result)=> console.log(result));
knex.destroy();