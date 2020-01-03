const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,

} = graphql;

const movies = [
  { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1', },
  { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2', },
  { id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3', },
  { id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4', },
  { id: '5', name: 'Paris', genre: 'Comedy', directorId: '1', },
  { id: '6', name: 'New history', genre: 'Sci-Fi-Triller', directorId: '3', },
];

const directors = [
  { id: '1', name: 'Quentin Tarantino', age: 55 },
  { id: '2', name: 'Michael Radford', age: 72 },
  { id: '3', name: 'James McTeigue', age: 51 },
  { id: '4', name: 'Guy Ritchie', age: 50 },
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID},
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find(director => director.id == parent.id);
      }
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID},
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        return movies.filter(movie => movie.directorId === parent.id)
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return movies.find(movie => movie.id == args.id);
      }
    },

    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return directors.find(director => director.id == args.id);
      }
    },

    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      }
    },

    directors: {
      type: GraphQLList(DirectorType),
      resolve(parent, args) {
        return directors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query
});