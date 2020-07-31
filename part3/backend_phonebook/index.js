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

// CREATE
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
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

// ERROR HANDLING
const errorHandler = (error, request, response, next) => {
  console.error("ERROR =>", error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

// GETTING DATA
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

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        console.log("\nPerson does not exist");
        response.status(404).end();
      }
    })
    // .catch((error) => {
    //   console.log("\nError fetching person ===> ", error);
    //   response.status(400).send({ error: "malformatted id" });
    // });
    .catch((error) => next(error));
});

// DELETE
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      console.log("Successful deletion");
      response.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

// UPDATE
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((newPerson) => {
      res.json(newPerson);
    })
    .catch((error) => next(error));
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
