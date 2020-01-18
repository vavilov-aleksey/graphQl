import { gql } from 'apollo-boost';

export const addDirectorMutation = gql`
  mutation addDirector($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
      name
      age
    }
  }
`;

export const updateDirectorMutation = gql`
    mutation updateDirector($id: ID!, $name: String!, $age: Int!) {
        updateDirector(id: $id, name: $name, age: $age) {
            name
        }
    }
`;

export const deleteDirectorMutation = gql`
  mutation deleteDirector($id: ID!) {
    deleteDirector(id: $id) {
      id
    }
  }
`;

