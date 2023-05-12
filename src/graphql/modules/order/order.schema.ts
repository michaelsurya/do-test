import gql from 'graphql-tag';

export default gql`
    enum OrderStatus {
        REJECTED
        WAITING
        PROCESSING
        DELIVERING
        DELIVERED
    }

    type Order @entity(additionalFields: [{ path: "user", type: "UserDbObject['_id']" }]) {
        id: ID! @id
        items: [OrderItem!]! @embedded
        amount: Float! @column
        status: OrderStatus! @column
        address: Address! @link
    }

    type OrderItem @entity(embedded: true) {
        id: ID! @id
        name: String! @column
        qty: Int! @column
        price: Float! @column
        totalPrice: Float! @column
    }

    extend type Query {
        myOrder: [Order!]!
        order(orderId: String!): Order!
    }

    extend type Mutation {
        createOrder(addressId: String!): String!
    }
` 