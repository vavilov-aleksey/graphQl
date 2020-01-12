const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;

const Movies = require('../models/movie');
const Directors = require('../models/director');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID},
    name: { type: GraphQLNonNull(GraphQLString) },
    genre: { type: GraphQLNonNull(GraphQLString) },
    rate: { type: GraphQLInt },
    watched: { type: GraphQLNonNull(GraphQLBoolean) },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return directors.find(director => director.id == parent.id);
        return Directors.findById(parent.directorId);
      }
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID},
    name: { type: GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLNonNull(GraphQLInt) },
    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter(movie => movie.directorId === parent.id)
        return Movies.find({ directorId: parent.id});
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const director = new Directors({
          name: args.name,
          age: args.age
        });
        return director.save();
      }
    },

    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
      },
      resolve(parent, args){
        return Directors.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name, age: args.age }},
          { new: true }
        )
      }
    },

    deleteDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Directors.findByIdAndRemove(args.id);
      }
    },

    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
        rate: { type: GraphQLInt },
        watched: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        const movie = new Movies({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
          rate: args.rate,
          watched: args.watched,
        });
        return movie.save();
      }
    },

    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
        rate: { type: GraphQLInt },
        watched: { type: GraphQLNonNull(GraphQLBoolean) }
      },
      resolve(parent, args){
        return Movies.findByIdAndUpdate(
          args.id,
          { $set: {
            name: args.name,
            genre: args.genre,
            directorId: args.directorId,
            rate: args.rate,
            watched: args.watched,
          }},
          { new: true }
        )
      }
    },

    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Movies.findByIdAndRemove(args.id);
      }
    },
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // return movies.find(movie => movie.id == args.id);
        return Movies.findById(args.id)
      }
    },

    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // return directors.find(director => director.id == args.id);
        return Directors.findById(args.id)
      }
    },

    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movies.find({})

      }
    },

    directors: {
      type: GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
        return Directors.find({})
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});