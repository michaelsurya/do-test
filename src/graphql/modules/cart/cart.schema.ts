import gql from 'graphql-tag';

export default gql`
    type Cart @entity(embedded: true) {
        items: [CartItem!]! @embedded
        totalAmount: Float! @column
    }

    type CartItem @entity(embedded: true) {
        id: ID! @id
        name: String! @column
        qty: Int! @column
        price: Float! @column
        totalPrice: Float! @column
    }

    input CartUpdateInput {
        productId: String!
        qty: Int!
    }

    extend type Query {
        myCart: Cart!
    }

    extend type Mutation {
        addProductToCart(productId: String!): Cart
        removeProductFromCart(productId: String!): Cart
        updateCartItemQuantity(input: CartUpdateInput!): Cart
    }
`