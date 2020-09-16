const {
  ApolloServer,
  gql,
  attachConnectorsToContext,
} = require("apollo-server");

const uuid = require("uuid/v1");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
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
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allAuthors: (root, args) => {
      return authors;
    },
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        const filterByAuth = books.filter((a) => a.author === args.author);
        return filterByAuth.filter((g) => g.genres.includes(args.genre));
      } else if (args.author) {
        return books.filter((a) => a.author === args.author);
      } else if (args.genre) {
        return books.filter((g) => g.genres.includes(args.genre));
      } else {
        return books;
      }
    },
  },
  Author: {
    bookCount: (root) => books.filter((b) => b.author === root.name).length,
  },
  Mutation: {
    addAuthor: (root, args) => {
      const author = { ...args, id: uuid(), born: null, bookCount: 1 };
      authors = authors.concat(author);
      return author;
    },
    addBook: (root, args) => {
      // check if author exists
      const foundAuthor = authors.find((a) => a.name === args.author);
      if (foundAuthor) {
        // if found, add +1 bookcount to author record
        const author = {
          ...foundAuthor,
          bookCount: foundAuthor.bookCount + 1,
        };
        authors = authors.filter((a) => a.name !== foundAuthor.name);
        authors = authors.concat(author);
      } else {
        // else create the author record
        const author = {
          name: args.author,
          id: uuid(),
          born: null,
          bookCount: 1,
        };
        authors = authors.concat(author);
      }
      // add the book to books list
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      return book;
    },
    editAuthor: (root, args) => {
      const foundAuthor = authors.find((a) => a.name === args.name);
      if (!foundAuthor) {
        return null;
      }

      const updateAuthor = { ...foundAuthor, born: args.setBornTo };
      authors = authors.map((a) => (a.name === args.name ? updateAuthor : a));
      return updateAuthor;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
