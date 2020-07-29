const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> <name to add> <number to add>"
  );
  process.exit(1);
}

const password = process.argv[2];
const nameEntered = process.argv[3];
const numberEntered = process.argv[4];

const url = `mongodb+srv://annfso:${password}@qluster4.bzuvg.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: nameEntered,
  number: numberEntered,
});

person
  .save()
  .then((result) => {
    console.log(`Added ${nameEntered} (${numberEntered}) to phonebook!`);
    //   mongoose.connection.close(); // since chaining promise, don't close yet!
  })
  .then((result) => {
    Person.find({}).then((result) => {
      console.log("\nPhonebook:");
      result.forEach((pers) => {
        console.log(pers.name, pers.number);
      });
      console.log("\n");
      mongoose.connection.close();
    });
  });
