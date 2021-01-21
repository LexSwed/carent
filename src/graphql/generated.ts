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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};



export type Node = {
  /** Resource ID */
  id: Scalars['String'];
};

export enum ClassTopicsOrder {
  OrderAsc = 'ORDER_ASC',
  OrderDesc = 'ORDER_DESC',
  UpdatedAsc = 'UPDATED_ASC',
  UpdatedDesc = 'UPDATED_DESC'
}

export type CreateClassGroupInput = {
  id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type Class = Node & {
  __typename?: 'Class';
  id: Scalars['String'];
  name: Scalars['String'];
  group: StudentGroup;
  topics?: Maybe<TopicConnection>;
};


export type ClassTopicsArgs = {
  sort?: Maybe<ClassTopicsSortOrder>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type StudentGroup = Node & {
  __typename?: 'StudentGroup';
  id: Scalars['String'];
  code: Scalars['String'];
};

export type Topic = Node & {
  __typename?: 'Topic';
  id: Scalars['String'];
  title: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
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

export type ClassTopicsSortOrder = {
  key?: Maybe<TopicSortKey>;
  order?: Maybe<TopicSortOrder>;
};

export type StudentGroupConnection = {
  __typename?: 'StudentGroupConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<StudentGroupEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type StudentGroupEdge = {
  __typename?: 'StudentGroupEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<StudentGroup>;
};

export enum TopicSortKey {
  Order = 'ORDER',
  Updated = 'UPDATED'
}

/** Sort direction, ASC = ascending (normal - latest on top), DESC = descending (reverse - oldest on top) */
export enum TopicSortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Query = {
  __typename?: 'Query';
  classes?: Maybe<ClassConnection>;
  class?: Maybe<Class>;
  groups?: Maybe<StudentGroupConnection>;
  topic?: Maybe<Topic>;
  me?: Maybe<User>;
};


export type QueryClassesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryClassArgs = {
  id: Scalars['ID'];
};


export type QueryGroupsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryTopicArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClass?: Maybe<Class>;
  updateClassName?: Maybe<Class>;
  createTopic?: Maybe<Topic>;
  reorderTopic?: Maybe<Topic>;
  updateTopic?: Maybe<Topic>;
  deleteTopic?: Maybe<Topic>;
};


export type MutationCreateClassArgs = {
  name: Scalars['String'];
  group: CreateClassGroupInput;
};


export type MutationUpdateClassNameArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationCreateTopicArgs = {
  classId: Scalars['ID'];
  title: Scalars['String'];
};


export type MutationReorderTopicArgs = {
  id: Scalars['ID'];
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type MutationDeleteTopicArgs = {
  id: Scalars['ID'];
};

export type GetLastUpdatedTopicQueryVariables = Exact<{
  classId: Scalars['ID'];
  sortOrder: ClassTopicsSortOrder;
}>;


export type GetLastUpdatedTopicQuery = (
  { __typename?: 'Query' }
  & { class?: Maybe<(
    { __typename?: 'Class' }
    & Pick<Class, 'id'>
    & { topics?: Maybe<(
      { __typename?: 'TopicConnection' }
      & { edges?: Maybe<Array<Maybe<(
        { __typename?: 'TopicEdge' }
        & { node?: Maybe<(
          { __typename?: 'Topic' }
          & Pick<Topic, 'id' | 'title'>
        )> }
      )>>> }
    )> }
  )> }
);

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

export type GroupFragmentFragment = (
  { __typename?: 'StudentGroup' }
  & Pick<StudentGroup, 'id' | 'code'>
);

export type CreateClassMutationVariables = Exact<{
  name: Scalars['String'];
  group: CreateClassGroupInput;
}>;


export type CreateClassMutation = (
  { __typename?: 'Mutation' }
  & { createClass?: Maybe<(
    { __typename?: 'Class' }
    & ClassFragmentFragment
  )> }
);

export type GetGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupsQuery = (
  { __typename?: 'Query' }
  & { groups?: Maybe<(
    { __typename?: 'StudentGroupConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'StudentGroupEdge' }
      & { node?: Maybe<(
        { __typename?: 'StudentGroup' }
        & GroupFragmentFragment
      )> }
    )>>> }
  )> }
);

export type GetClassTopicsQueryVariables = Exact<{
  classId: Scalars['ID'];
}>;


export type GetClassTopicsQuery = (
  { __typename?: 'Query' }
  & { class?: Maybe<(
    { __typename?: 'Class' }
    & Pick<Class, 'id'>
    & { topics?: Maybe<(
      { __typename?: 'TopicConnection' }
      & { edges?: Maybe<Array<Maybe<(
        { __typename?: 'TopicEdge' }
        & { node?: Maybe<(
          { __typename?: 'Topic' }
          & Pick<Topic, 'id' | 'title'>
        )> }
      )>>> }
    )> }
  )> }
);

export type CreateNewTopicMutationVariables = Exact<{
  classId: Scalars['ID'];
  title: Scalars['String'];
}>;


export type CreateNewTopicMutation = (
  { __typename?: 'Mutation' }
  & { createTopic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id' | 'title'>
  )> }
);

export type UpdateTopicOrderMutationVariables = Exact<{
  id: Scalars['ID'];
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
}>;


export type UpdateTopicOrderMutation = (
  { __typename?: 'Mutation' }
  & { reorderTopic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id' | 'title'>
  )> }
);

export type GetClassInfoQueryVariables = Exact<{
  classId: Scalars['ID'];
}>;


export type GetClassInfoQuery = (
  { __typename?: 'Query' }
  & { class?: Maybe<(
    { __typename?: 'Class' }
    & Pick<Class, 'id' | 'name'>
    & { group: (
      { __typename?: 'StudentGroup' }
      & Pick<StudentGroup, 'id' | 'code'>
    ) }
  )> }
);

export type UpdateClassNameMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


export type UpdateClassNameMutation = (
  { __typename?: 'Mutation' }
  & { updateClassName?: Maybe<(
    { __typename?: 'Class' }
    & Pick<Class, 'id' | 'name'>
  )> }
);

export type UpdateTopicMutationVariables = Exact<{
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
}>;


export type UpdateTopicMutation = (
  { __typename?: 'Mutation' }
  & { updateTopic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id'>
  )> }
);

export type GetTopicDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTopicDetailsQuery = (
  { __typename?: 'Query' }
  & { topic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id' | 'title'>
  )> }
);

export type GetShortClassInfoQueryVariables = Exact<{
  classId: Scalars['ID'];
}>;


export type GetShortClassInfoQuery = (
  { __typename?: 'Query' }
  & { class?: Maybe<(
    { __typename?: 'Class' }
    & Pick<Class, 'id' | 'name'>
    & { group: (
      { __typename?: 'StudentGroup' }
      & Pick<StudentGroup, 'id' | 'code'>
    ) }
  )> }
);

export type DeleteTopicMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTopicMutation = (
  { __typename?: 'Mutation' }
  & { deleteTopic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id'>
  )> }
);
