import gql from "graphql-tag";

export default gql`
    extend type Query {
        getToken(email: String, password: String): String
    }
`;
