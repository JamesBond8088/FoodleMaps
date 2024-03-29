/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePlace = /* GraphQL */ `
  subscription OnCreatePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onCreatePlace(filter: $filter) {
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
export const onUpdatePlace = /* GraphQL */ `
  subscription OnUpdatePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onUpdatePlace(filter: $filter) {
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
export const onDeletePlace = /* GraphQL */ `
  subscription OnDeletePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onDeletePlace(filter: $filter) {
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
export const onCreateDeal = /* GraphQL */ `
  subscription OnCreateDeal($filter: ModelSubscriptionDealFilterInput) {
    onCreateDeal(filter: $filter) {
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
export const onUpdateDeal = /* GraphQL */ `
  subscription OnUpdateDeal($filter: ModelSubscriptionDealFilterInput) {
    onUpdateDeal(filter: $filter) {
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
export const onDeleteDeal = /* GraphQL */ `
  subscription OnDeleteDeal($filter: ModelSubscriptionDealFilterInput) {
    onDeleteDeal(filter: $filter) {
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
