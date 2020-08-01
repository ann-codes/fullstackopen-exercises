require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

// MIDDLEWARE
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("content-post", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content-post"
  )
);

// ERROR HANDLING
const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  // // Does not seem to pass error object using next??????
  // else if (error.name === "ValidationError") {
  //   return res.status(400).send({ error: error.message });
  // }
  next(error);
};
app.use(errorHandler);

// CREATE
app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  let nameExists;

  Person.find({}).then((persons) => {
    nameExists = persons
      .map((p) => p.name.toLowerCase())
      .includes(body.name.toLowerCase());
  });

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  if (nameExists) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson.toJSON()))
    .catch((error) => res.status(400).json({ error: error.message }));
  // Error does not seem to pass error object when using next ????
  // will use the old way of passing error in order to display the error message
});

// RETRIEVE
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  const now = new Date();
  Person.find({}).then((persons) =>
    res.send(
      `<p>Phonebook has info for ${
        persons.length
      } people.</p><p>${now.toString()}</p>`
    )
  );
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        console.log("\nPerson does not exist");
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// UPDATE
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((newPerson) => res.json(newPerson))
    .catch((error) => next(error));
});

// DELETE
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((err) => next(err));
});

// // this causes issues, keeping it commented it out
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: "unknown endpoint" });
// };
// app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
