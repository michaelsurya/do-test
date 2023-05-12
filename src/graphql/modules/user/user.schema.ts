import gql from 'graphql-tag';

export default gql`
    type User @entity {
        id: ID! @id
        firebaseId: String! @column
        cart: Cart! @embedded
    }
`