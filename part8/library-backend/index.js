const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require("apollo-server");
const mongoose = require("mongoose");
const config = require("./config");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

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
  type Subscription {
    bookAdded: Book!
  }
`;

// 8.26 n+1 problem, not sure how to test?
const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async (root, args, context, info) => await Author.find({}),
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
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre.toLowerCase(),
      });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "meow") {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
    },
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
    editAuthor: async (root, args, context) => {
      const foundAuthor = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser;
      if (!currentUser) {
        console.log("NOT AUTHENTICATED");

        // inclusion of below will have app-breaking Unhandled Rejection (Error)
        // whereas no issues w/ same code in addBook? same using UserInputError
        // also tried putting throw AuthError into a try/catch LOL

        throw new AuthenticationError("User not authenticated!");
      }
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
    addBook: async (root, args, context) => {
      // check if author exists
      const foundAuthor = await Author.findOne({ name: args.author });
      // check if user is loggedin, if not then throw error
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("User not authenticated");
      }

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
      try {
        await book.save();
      } catch (e) {
        console.log("ERROR:", e.message);
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`[ Server ready at ${url} ]`);
  console.log(`[ Subscriptions ready at ${subscriptionsUrl} ]`);
});
