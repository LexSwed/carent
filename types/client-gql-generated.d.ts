type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
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



type Node = {
  /** Resource ID */
  id: Scalars['String'];
};

enum ClassTopicsOrder {
  OrderAsc = 'ORDER_ASC',
  OrderDesc = 'ORDER_DESC',
  UpdatedAsc = 'UPDATED_ASC',
  UpdatedDesc = 'UPDATED_DESC'
}

type CreateClassGroupInput = {
  id?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

type Class = Node & {
  __typename?: 'Class';
  id: Scalars['String'];
  name: Scalars['String'];
  group: StudentGroup;
  topics?: Maybe<TopicConnection>;
};


type ClassTopicsArgs = {
  sort?: Maybe<ClassTopicsSortOrder>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

type StudentGroup = Node & {
  __typename?: 'StudentGroup';
  id: Scalars['String'];
  code: Scalars['String'];
};

type Topic = Node & {
  __typename?: 'Topic';
  id: Scalars['String'];
  title: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  attachments?: Maybe<TopicAttachmentConnection>;
};


type TopicAttachmentsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

type TopicAttachment = {
  __typename?: 'TopicAttachment';
  id: Scalars['String'];
  href: Scalars['String'];
  name: Scalars['String'];
};

type User = Node & {
  __typename?: 'User';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

type ClassConnection = {
  __typename?: 'ClassConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<ClassEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

type ClassEdge = {
  __typename?: 'ClassEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Class>;
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
type PageInfo = {
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

type TopicConnection = {
  __typename?: 'TopicConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<TopicEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

type TopicEdge = {
  __typename?: 'TopicEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Topic>;
};

type ClassTopicsSortOrder = {
  key?: Maybe<TopicSortKey>;
  order?: Maybe<TopicSortOrder>;
};

type StudentGroupConnection = {
  __typename?: 'StudentGroupConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<StudentGroupEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

type StudentGroupEdge = {
  __typename?: 'StudentGroupEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<StudentGroup>;
};

type TopicAttachmentInput = {
  /** Reference to the attachment */
  href: Scalars['String'];
  /** Name of the attachment */
  name: Scalars['String'];
};

type TopicAttachmentConnection = {
  __typename?: 'TopicAttachmentConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<TopicAttachmentEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

type TopicAttachmentEdge = {
  __typename?: 'TopicAttachmentEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<TopicAttachment>;
};

enum TopicSortKey {
  Order = 'ORDER',
  Updated = 'UPDATED'
}

/** Sort direction, ASC = ascending (normal - latest on top), DESC = descending (reverse - oldest on top) */
enum TopicSortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

type Query = {
  __typename?: 'Query';
  classes?: Maybe<ClassConnection>;
  class?: Maybe<Class>;
  groups?: Maybe<StudentGroupConnection>;
  topic?: Maybe<Topic>;
  me?: Maybe<User>;
};


type QueryClassesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


type QueryClassArgs = {
  id: Scalars['ID'];
};


type QueryGroupsArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


type QueryTopicArgs = {
  id: Scalars['ID'];
};

type Mutation = {
  __typename?: 'Mutation';
  createClass?: Maybe<Class>;
  updateClassName?: Maybe<Class>;
  createTopic?: Maybe<Topic>;
  reorderTopic?: Maybe<Topic>;
  updateTopic?: Maybe<Topic>;
  deleteTopic?: Maybe<Topic>;
  addTopicAttachment?: Maybe<TopicAttachment>;
  renameTopicAttachment?: Maybe<TopicAttachment>;
  deleteTopicAttachment?: Maybe<TopicAttachment>;
};


type MutationCreateClassArgs = {
  name: Scalars['String'];
  group: CreateClassGroupInput;
};


type MutationUpdateClassNameArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


type MutationCreateTopicArgs = {
  classId: Scalars['ID'];
  title: Scalars['String'];
};


type MutationReorderTopicArgs = {
  id: Scalars['ID'];
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
};


type MutationUpdateTopicArgs = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


type MutationDeleteTopicArgs = {
  id: Scalars['ID'];
};


type MutationAddTopicAttachmentArgs = {
  topicId: Scalars['ID'];
  data: TopicAttachmentInput;
};


type MutationRenameTopicAttachmentArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


type MutationDeleteTopicAttachmentArgs = {
  id: Scalars['ID'];
};

type GetLastUpdatedTopicQueryVariables = Exact<{
  classId: Scalars['ID'];
  sortOrder: ClassTopicsSortOrder;
}>;


type GetLastUpdatedTopicQuery = (
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

type GetClassesQueryVariables = Exact<{ [key: string]: never; }>;


type GetClassesQuery = (
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

type ClassFragmentFragment = (
  { __typename?: 'Class' }
  & Pick<Class, 'id' | 'name'>
  & { group: (
    { __typename?: 'StudentGroup' }
    & Pick<StudentGroup, 'id' | 'code'>
  ) }
);

type GroupFragmentFragment = (
  { __typename?: 'StudentGroup' }
  & Pick<StudentGroup, 'id' | 'code'>
);

type CreateClassMutationVariables = Exact<{
  name: Scalars['String'];
  group: CreateClassGroupInput;
}>;


type CreateClassMutation = (
  { __typename?: 'Mutation' }
  & { createClass?: Maybe<(
    { __typename?: 'Class' }
    & ClassFragmentFragment
  )> }
);

type GetGroupsQueryVariables = Exact<{ [key: string]: never; }>;


type GetGroupsQuery = (
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

type GetClassInfoQueryVariables = Exact<{
  classId: Scalars['ID'];
}>;


type GetClassInfoQuery = (
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

type UpdateClassNameMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


type UpdateClassNameMutation = (
  { __typename?: 'Mutation' }
  & { updateClassName?: Maybe<(
    { __typename?: 'Class' }
    & Pick<Class, 'id' | 'name'>
  )> }
);

type CreateNewTopicMutationVariables = Exact<{
  classId: Scalars['ID'];
  title: Scalars['String'];
}>;


type CreateNewTopicMutation = (
  { __typename?: 'Mutation' }
  & { createTopic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id' | 'title'>
  )> }
);

type NewTopicFragment = (
  { __typename?: 'Topic' }
  & Pick<Topic, 'id' | 'title'>
);

type UpdateTopicOrderMutationVariables = Exact<{
  id: Scalars['ID'];
  before?: Maybe<Scalars['ID']>;
  after?: Maybe<Scalars['ID']>;
}>;


type UpdateTopicOrderMutation = (
  { __typename?: 'Mutation' }
  & { reorderTopic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id' | 'title'>
  )> }
);

type GetClassTopicsQueryVariables = Exact<{
  classId: Scalars['ID'];
}>;


type GetClassTopicsQuery = (
  { __typename?: 'Query' }
  & { class?: Maybe<(
    { __typename?: 'Class' }
    & Pick<Class, 'id' | 'name'>
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

type GetTopicDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


type GetTopicDetailsQuery = (
  { __typename?: 'Query' }
  & { topic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id' | 'title'>
  )> }
);

type UpdateTopicMutationVariables = Exact<{
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
}>;


type UpdateTopicMutation = (
  { __typename?: 'Mutation' }
  & { updateTopic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id'>
  )> }
);

type DeleteTopicMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


type DeleteTopicMutation = (
  { __typename?: 'Mutation' }
  & { deleteTopic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id'>
  )> }
);

type UpdateTopicTitleMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
}>;


type UpdateTopicTitleMutation = (
  { __typename?: 'Mutation' }
  & { updateTopic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id' | 'title'>
  )> }
);

type GetTopicAttachmentsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


type GetTopicAttachmentsQuery = (
  { __typename?: 'Query' }
  & { topic?: Maybe<(
    { __typename?: 'Topic' }
    & Pick<Topic, 'id'>
    & { attachments?: Maybe<(
      { __typename?: 'TopicAttachmentConnection' }
      & { edges?: Maybe<Array<Maybe<(
        { __typename?: 'TopicAttachmentEdge' }
        & { node?: Maybe<(
          { __typename?: 'TopicAttachment' }
          & Pick<TopicAttachment, 'id' | 'href' | 'name'>
        )> }
      )>>> }
    )> }
  )> }
);

type AddTopicAttachmentMutationVariables = Exact<{
  topicId: Scalars['ID'];
  data: TopicAttachmentInput;
}>;


type AddTopicAttachmentMutation = (
  { __typename?: 'Mutation' }
  & { addTopicAttachment?: Maybe<(
    { __typename?: 'TopicAttachment' }
    & Pick<TopicAttachment, 'id' | 'href' | 'name'>
  )> }
);

type NewLinkFragment = (
  { __typename?: 'TopicAttachment' }
  & Pick<TopicAttachment, 'id' | 'href' | 'name'>
);

type RenameTopicAttachmentMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


type RenameTopicAttachmentMutation = (
  { __typename?: 'Mutation' }
  & { renameTopicAttachment?: Maybe<(
    { __typename?: 'TopicAttachment' }
    & Pick<TopicAttachment, 'id' | 'name'>
  )> }
);

type DeleteTopicAttachmentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


type DeleteTopicAttachmentMutation = (
  { __typename?: 'Mutation' }
  & { deleteTopicAttachment?: Maybe<(
    { __typename?: 'TopicAttachment' }
    & Pick<TopicAttachment, 'id'>
  )> }
);
