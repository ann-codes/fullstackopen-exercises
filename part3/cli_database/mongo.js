const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> <name to add to phonebook> <number to add to phonebook>"
  );
  process.exit(1);
}

const password = process.argv[2];
const nameEntered = process.argv[3];
const numberEntered = process.argv[4];

const url = `mongodb+srv://annfso:${password}@qluster4.bzuvg.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

/// entry
const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model("Entry", entrySchema);

const entry = new Entry({
  name: nameEntered,
  number: numberEntered,
});

entry.save().then((result) => {
  console.log(`Added ${nameEntered} (${numberEntered}) to phonebook!`);
  console.log("result => ", result);
  mongoose.connection.close();
});
