const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const uuid = require("uuid/v1");
const book = require("./models/book");

mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true); // depreciation warnings
mongoose.set("useCreateIndex", true); // depreciation warnings

const MONGODB_URI =
  "mongodb+srv://annfso:annfso@qluster4.bzuvg.mongodb.net/graphql-library?retryWrites=true&w=majority";

console.log(`[ Connecting to ${MONGODB_URI} ]`);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("[ Connected to MongoDB ]");
  })
  .catch((error) => {
    console.log("==> Error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    addAuthor(name: String!): Author
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        const books = await Book.find({
          author: author,
          genres: { $all: args.genre },
        });
        return books;
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const books = await Book.find({ author: author });
        return books;
      } else if (args.genre) {
        const books = await Book.find({ genres: { $in: args.genre } });
        return books;
      } else {
        throw new UserInputError("ERROR: Something went wrong?", {
          invalidArgs: args,
        });
      }
    },
  },
  Author: {
    bookCount: async (root) => {
      const count = await Book.find({ author: root._id }).countDocuments();
      return count;
    },
  },
  Book: {
    author: (root) => {
      return {
        name: root.name,
      };
    },
  },
  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({
        ...args,
        born: null,
        bookCount: 1,
      });

      try {
        await author.save();
      } catch (e) {
        console.log("ERROR:", e.message);
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    addBook: async (root, args) => {
      // check if author exists
      const foundAuthor = await Author.findOne({ name: args.author });
      let author;

      // check to find if author exists to create new or use existing
      if (foundAuthor) {
        // if found, add +1 bookcount to author record
        // note: can't use spread to deep clone obj in graphQL
        foundAuthor.bookCount = foundAuthor.bookCount + 1;
        author = foundAuthor;
      } else {
        // else create the author record
        const newAuthor = new Author({
          name: args.author,
          born: null,
          bookCount: 1,
        });
        author = newAuthor;
      }

      // save correct author
      try {
        await author.save();
      } catch (e) {
        console.log("ERROR:", e.message);
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      // add the book to books list
      const book = new Book({ ...args, author: author });
      await book.save();
      return book;
    },
    editAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name });
      if (!foundAuthor) {
        throw new UserInputError("Author not found!", {
          invalidArgs: args,
        });
      } else {
        foundAuthor.born = args.setBornTo;
        try {
          await foundAuthor.save();
        } catch (e) {
          console.log("ERROR:", e.message);
          throw new UserInputError(e.message, {
            invalidArgs: args,
          });
        }
      }
      return foundAuthor;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`[ Server ready at ${url} ]`);
});
