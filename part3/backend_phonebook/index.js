const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Nothing to see here!</h1>");
});

// part 3.1
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// part 3.2
app.get("/info", (req, res) => {
  const now = new Date();
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people.</p><p>${now.toString()}</p>`
  );
});

// part 3.3
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// part 3.4
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  // reset updated data here, would be a setter in react
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

// part 3.5
const generateId = () => {
  return Math.floor(Math.random() * Math.floor(1000001));
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const nameExists = persons
    .map((p) => p.name.toLowerCase())
    .includes(body.name.toLowerCase());

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  // part 3.6
  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
