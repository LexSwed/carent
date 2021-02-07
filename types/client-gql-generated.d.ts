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

type Assignment = Node & {
  __typename?: 'Assignment';
  /** Assignment goals, things to cover, etc */
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  state?: Maybe<AssignmentState>;
  title: Scalars['String'];
  topic: Topic;
};

type AssignmentConnection = {
  __typename?: 'AssignmentConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<AssignmentEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

type AssignmentEdge = {
  __typename?: 'AssignmentEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Assignment>;
};

type AssignmentState = Node & {
  __typename?: 'AssignmentState';
  closedAt: Scalars['DateTime'];
  id: Scalars['String'];
  open: Scalars['Boolean'];
  openedAt: Scalars['DateTime'];
};

type Class = Node & {
  __typename?: 'Class';
  group: StudentGroup;
  id: Scalars['String'];
  name: Scalars['String'];
  topics?: Maybe<TopicConnection>;
};


type ClassTopicsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<ClassTopicsSortOrder>;
};

type ClassConnection = {
  __typename?: 'ClassConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<ClassEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

type ClassEdge = {
  __typename?: 'ClassEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Class>;
};

enum ClassTopicsOrder {
  OrderAsc = 'ORDER_ASC',
  OrderDesc = 'ORDER_DESC',
  UpdatedAsc = 'UPDATED_ASC',
  UpdatedDesc = 'UPDATED_DESC'
}

type ClassTopicsSortOrder = {
  key?: Maybe<TopicSortKey>;
  order?: Maybe<TopicSortOrder>;
};

type CreateClassGroupInput = {
  code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};



type Mutation = {
  __typename?: 'Mutation';
  addTopicAttachment?: Maybe<TopicAttachment>;
  createAssignment?: Maybe<Assignment>;
  createClass?: Maybe<Class>;
  createTopic?: Maybe<Topic>;
  deleteTopic?: Maybe<Topic>;
  deleteTopicAttachment?: Maybe<TopicAttachment>;
  renameTopicAttachment?: Maybe<TopicAttachment>;
  reorderTopic?: Maybe<Topic>;
  updateClassName?: Maybe<Class>;
  updateTopic?: Maybe<Topic>;
};


type MutationAddTopicAttachmentArgs = {
  data: TopicAttachmentInput;
  topicId: Scalars['ID'];
};


type MutationCreateAssignmentArgs = {
  title: Scalars['String'];
  topicId: Scalars['ID'];
};


type MutationCreateClassArgs = {
  group: CreateClassGroupInput;
  name: Scalars['String'];
};


type MutationCreateTopicArgs = {
  classId: Scalars['ID'];
  title: Scalars['String'];
};


type MutationDeleteTopicArgs = {
  id: Scalars['ID'];
};


type MutationDeleteTopicAttachmentArgs = {
  id: Scalars['ID'];
};


type MutationRenameTopicAttachmentArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


type MutationReorderTopicArgs = {
  after?: Maybe<Scalars['ID']>;
  before?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
};


type MutationUpdateClassNameArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


type MutationUpdateTopicArgs = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

type Node = {
  /** Resource ID */
  id: Scalars['String'];
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
};

type Query = {
  __typename?: 'Query';
  assignments?: Maybe<AssignmentConnection>;
  class?: Maybe<Class>;
  classes?: Maybe<ClassConnection>;
  groups?: Maybe<StudentGroupConnection>;
  me?: Maybe<User>;
  topic?: Maybe<Topic>;
};


type QueryAssignmentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  classId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  topicId?: Maybe<Scalars['ID']>;
};


type QueryClassArgs = {
  id: Scalars['ID'];
};


type QueryClassesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


type QueryGroupsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


type QueryTopicArgs = {
  id: Scalars['ID'];
};

type StudentGroup = Node & {
  __typename?: 'StudentGroup';
  code: Scalars['String'];
  id: Scalars['String'];
};

type StudentGroupConnection = {
  __typename?: 'StudentGroupConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<StudentGroupEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

type StudentGroupEdge = {
  __typename?: 'StudentGroupEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<StudentGroup>;
};

type Topic = Node & {
  __typename?: 'Topic';
  attachments?: Maybe<TopicAttachmentConnection>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


type TopicAttachmentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

type TopicAttachment = Node & {
  __typename?: 'TopicAttachment';
  href: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

type TopicAttachmentConnection = {
  __typename?: 'TopicAttachmentConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<TopicAttachmentEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

type TopicAttachmentEdge = {
  __typename?: 'TopicAttachmentEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<TopicAttachment>;
};

type TopicAttachmentInput = {
  /** Reference to the attachment */
  href: Scalars['String'];
  /** Name of the attachment */
  name: Scalars['String'];
};

type TopicConnection = {
  __typename?: 'TopicConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<TopicEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

type TopicEdge = {
  __typename?: 'TopicEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Topic>;
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

type User = Node & {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

type GetAssignmentsQueryVariables = Exact<{
  classId: Scalars['ID'];
  topicId?: Maybe<Scalars['ID']>;
}>;


type GetAssignmentsQuery = (
  { __typename?: 'Query' }
  & { assignments?: Maybe<(
    { __typename?: 'AssignmentConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'AssignmentEdge' }
      & { node?: Maybe<(
        { __typename?: 'Assignment' }
        & Pick<Assignment, 'id' | 'title' | 'description'>
        & { topic: (
          { __typename?: 'Topic' }
          & Pick<Topic, 'id' | 'title'>
        ), state?: Maybe<(
          { __typename?: 'AssignmentState' }
          & Pick<AssignmentState, 'id' | 'open'>
        )> }
      )> }
    )>>> }
  )> }
);

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

type CreatedAssignmentFragment = (
  { __typename?: 'Assignment' }
  & Pick<Assignment, 'id' | 'title' | 'description'>
  & { state?: Maybe<(
    { __typename?: 'AssignmentState' }
    & Pick<AssignmentState, 'open'>
  )> }
);

type CreateAssignmentMutationVariables = Exact<{
  title: Scalars['String'];
  topicId: Scalars['ID'];
}>;


type CreateAssignmentMutation = (
  { __typename?: 'Mutation' }
  & { createAssignment?: Maybe<(
    { __typename?: 'Assignment' }
    & CreatedAssignmentFragment
  )> }
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
