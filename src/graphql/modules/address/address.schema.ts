import gql from "graphql-tag";

export default gql`
  type Address
    @entity(additionalFields: [{ path: "user", type: "UserDbObject['_id']" }]) {
    id: ID! @id
    name: String! @column
    address: String! @column
    city: String! @column
    province: String! @column
    country: String! @column
  }

  input AddressUpdateInput {
    name: String!
    address: String!
    city: String!
    province: String!
    country: String!
  }

  extend type Query {
    myAddress: [Address!]!
  }

  extend type Mutation {
    addAddress(input: AddressUpdateInput!): String!
    editAddress(addressId: String!, input: AddressUpdateInput!): Address!
    deleteAddress(addressId: String!): Boolean!
  }
`;
