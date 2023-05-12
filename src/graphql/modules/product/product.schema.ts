import gql from 'graphql-tag';

export default gql`
    type Product @entity {
        id: ID! @id
        name: String! @column
        price: Float! @column
    }

    extend type Query {
        products: [Product!]!
    }
`;
