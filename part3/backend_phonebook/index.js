require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("content-post", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content-post"
  )
);

// app.get("/", (req, res) => {
//   res.send("<h1>Nothing to see here!</h1>");
// });

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  const now = new Date();
  Person.find({}).then((persons) => {
    res.send(
      `<p>Phonebook has info for ${
        persons.length
      } people.</p><p>${now.toString()}</p>`
    );
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  Person.find({}).then((persons) => {
    const person = persons.find((person) => person.id === id);
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = Number(request.params.id);
  // reset updated data here, would be a setter in react
  // persons = persons.filter((person) => person.id !== id);
  // response.status(204).end();

  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      console.log("Successful deletion");
      response.status(204).end();
    })
    .catch((err) => {
      next(err)
      console.log("Error: ", err);
    });
});

// Helper function
const generateId = () => {
  return Math.floor(Math.random() * Math.floor(1000001));
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  let nameExists;

  Person.find({}).then((persons) => {
    nameExists = persons
      .map((p) => p.name.toLowerCase())
      .includes(body.name.toLowerCase());
  });

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
