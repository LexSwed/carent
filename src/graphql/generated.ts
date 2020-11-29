export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};


export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  classes?: Maybe<ClassConnection>;
};


export type QueryClassesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createClass?: Maybe<Class>;
};


export type MutationCreateClassArgs = {
  name: Scalars['String'];
  studentGroupCode: Scalars['String'];
};

export type Node = {
  /** Resource ID */
  id: Scalars['String'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type Topic = Node & {
  __typename?: 'Topic';
  id: Scalars['String'];
  title: Scalars['String'];
};

export type StudentGroup = Node & {
  __typename?: 'StudentGroup';
  id: Scalars['String'];
  code: Scalars['String'];
};

export type Class = Node & {
  __typename?: 'Class';
  id: Scalars['String'];
  name: Scalars['String'];
  group: StudentGroup;
  topics?: Maybe<TopicConnection>;
};


export type ClassTopicsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type ClassConnection = {
  __typename?: 'ClassConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<ClassEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ClassEdge = {
  __typename?: 'ClassEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Class>;
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
};

export type TopicConnection = {
  __typename?: 'TopicConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<TopicEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type TopicEdge = {
  __typename?: 'TopicEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Topic>;
};

export type GetClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClassesQuery = (
  { __typename?: 'Query' }
  & { classes?: Maybe<(
    { __typename?: 'ClassConnection' }
    & Pick<ClassConnection, 'totalCount'>
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'ClassEdge' }
      & { node?: Maybe<(
        { __typename?: 'Class' }
        & Pick<Class, 'id' | 'name'>
        & { group: (
          { __typename?: 'StudentGroup' }
          & Pick<StudentGroup, 'id' | 'code'>
        ) }
      )> }
    )>>> }
  )> }
);

export type ClassFragmentFragment = (
  { __typename?: 'Class' }
  & Pick<Class, 'id' | 'name'>
  & { group: (
    { __typename?: 'StudentGroup' }
    & Pick<StudentGroup, 'id' | 'code'>
  ) }
);

export type CreateClassMutationVariables = Exact<{
  name: Scalars['String'];
  groupCode: Scalars['String'];
}>;


export type CreateClassMutation = (
  { __typename?: 'Mutation' }
  & { createClass?: Maybe<(
    { __typename?: 'Class' }
    & ClassFragmentFragment
  )> }
);
