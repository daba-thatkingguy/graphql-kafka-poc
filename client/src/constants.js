import { gql } from "@apollo/client"


export const CREATE_USER = gql`
mutation CREATE_USER($data: CreateUserInput!) {
  createUser(data: $data) {
    ...on Error {
      message
    }
    ...on ReturnedUser {
      user {
        name
        email
        username
      }
    }
  }
}
`

export const GET_POSTS = gql`
  query GET_POSTS {
    title
    author
    _id
  }

`

export const GET_ALL_USERS = gql`
query GET_USERS {
  getUsers {
    _id
    name
    email
    username
  }
}
`

export const GET_USER_BY_ID = gql`
query GET_USER_BY_ID($id: ID!) {
  getUserById(id: $id) {
    ...on Error {
      message
    }
    ...on ReturnedUser {
      _id
      name
      email
    }
  }
}
`