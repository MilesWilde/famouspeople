const settings = require("./settings"); // settings.json
const userInput = process.argv[2];

const knex = require("knex")({
  client: 'pg',
  connection: { 
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    acquireConnectionTimeout: 10000
  }
});

knex.select().from('famous_people')
  .where(
    'first_name', 'ilike', `%${userInput}%`
  )
  .orWhere(
    'last_name', 'ilike', `%${userInput}%`
  )
  .then((result,err) =>{
    printRows(result);
  })
knex.destroy();
  // printRows(result);
console.log("Searching...")


function printRows(dataObject){
  console.log(`Found ${dataObject.length} person(s) by the name ${userInput}`)
  for(let i in dataObject){
    console.log(`${Number(i)+1} ${dataObject[i].first_name} ${dataObject[i].last_name}, born ${dataObject[i].birthdate}`);
  }
}