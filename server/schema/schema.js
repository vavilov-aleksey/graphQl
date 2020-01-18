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
  name: 'Movies',
  fields: () => ({
    id: { type: GraphQLID},
    name: { type: GraphQLNonNull(GraphQLString) },
    genre: { type: GraphQLNonNull(GraphQLString) },
    rate: { type: GraphQLInt },
    watched: { type: GraphQLNonNull(GraphQLBoolean) },
    director: {
      type: DirectorType,
      resolve(parent) {
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
      resolve(parent) {
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
        watched: { type: GraphQLBoolean }
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
        return Movies.findById(args.id)
      }
    },

    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Directors.findById(args.id)
      }
    },

    movies: {
      type: GraphQLList(MovieType),
      args: { name: { type: GraphQLString }},
      resolve(parent, { name }) {
        return Movies.find({ name: { $regex: name, $options: 'i'}})
      }
    },

    directors: {
      type: GraphQLList(DirectorType),
      args: { name: { type: GraphQLString }},
      resolve(parent, { name }) {
        return Directors.find({ name: { $regex: name, $options: 'i'}})
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});