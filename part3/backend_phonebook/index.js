const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.static('build'))

// ======================================================== testing db connection
if (process.argv.length < 3) { // test
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2] // test
const mongoPw = process.env.REACT_APP_MONGO_PW
const url = `mongodb+srv://annfso:${password}@qluster4.bzuvg.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
// ========================================================



// part 3.8 (including both versions)
morgan.token("content-post", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content-post"
  )
);
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["content-post"](req, res),
    ].join(" ");
  })
);

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
  // reset persons obj
  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
