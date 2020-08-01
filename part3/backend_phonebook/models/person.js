const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

mongoose.set("useFindAndModify", false);
mongoose.set("runValidators", true);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// SCHEMA
const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, required: true, minlength: 8 },
});

personSchema.plugin(uniqueValidator);

const Person = mongoose.model("Person", personSchema);

// convert the mongo _id to id and
// deleting the mongo _id and __v obj from displaying in api endpoint
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Data to seed
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// SEED DATABASE
const seedPersonDB = (data) => {
  data.forEach((person) => {
    const addPerson = new Person({
      name: person.name,
      number: person.number,
      id: person.id,
    });

    addPerson
      .save()
      .then((result) => {
        console.log(`Seeding ${person.name} (${person.number}) to phonebook!`);
        mongoose.connection.close();
      })
      .catch((err) => {
        console.log("Error in data seed:", err.message);
      });
  });
};

seedPersonDB(persons); // comment out when seeding completes

module.exports = mongoose.model("Person", personSchema);
