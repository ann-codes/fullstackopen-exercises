const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const config = require("./config");
const Book = require("./models/book");
const Author = require("./models/author");
const jwt = require("jsonwebtoken");

mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true); // depreciation warnings
mongoose.set("useCreateIndex", true); // depreciation warnings

console.log(`[ Connecting to ${config.MONGODB_URI} ]`);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("[ Connected to MongoDB ]");
  })
  .catch((error) => {
    console.log("==> Error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
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
    me: User
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
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, { author, genre }) => {
      if (author && genre) {
        const findAuthor = await Author.findOne({ name: author });
        const books = await Book.find({
          author: findAuthor,
          genres: { $all: genre },
        });
        return books;
      } else if (author) {
        const findAuthor = await Author.findOne({ name: author });
        const books = await Book.find({ author: findAuthor }).populate(
          "author"
        );
        return books;
      } else if (genre) {
        const books = await Book.find({ genres: { $in: genre } }).populate(
          "author"
        );
        return books;
      } else {
        return await Book.find({}).populate("author").exec();
      }
    },
  },
  Author: {
    bookCount: async (root) => {
      const count = await Book.find({ author: root._id }).countDocuments();
      return count;
    },
  },
  // including this produced error in nested relationship w/ query,
  // bc of inclusion of ID in Author?
  Book: {
    // author: (root) => {
    //   return {
    //     // name: root.name,
    //     // born: root.name,
    //     // bookCount: root.bookCount,
    //     // id: root.id,
    //     // // ...root // <= doesn't work
    //   };
    // },
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
