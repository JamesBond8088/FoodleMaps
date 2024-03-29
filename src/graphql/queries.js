/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlace = /* GraphQL */ `
  query GetPlace($id: ID!) {
    getPlace(id: $id) {
      id
      name
      longitude
      latitude
      deal
      avg_rating
      num_rating
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPlaces = /* GraphQL */ `
  query ListPlaces(
    $filter: ModelPlaceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        longitude
        latitude
        deal
        avg_rating
        num_rating
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDeal = /* GraphQL */ `
  query GetDeal($id: ID!) {
    getDeal(id: $id) {
      id
      name
      photos
      description
      price
      rating
      num_rating
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDeals = /* GraphQL */ `
  query ListDeals(
    $filter: ModelDealFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        photos
        description
        price
        rating
        num_rating
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
