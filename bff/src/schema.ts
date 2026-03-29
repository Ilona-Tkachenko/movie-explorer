export const typeDefs = `#graphql
type SearchItem {
    id: ID!
    title: String!
    year: String
    rating: Float
    posterUrl: String
    mediaType: String!
}

type Query {
    search(query: String!): [SearchItem!]!
}
`;
