/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { Context as Context } from "./../context"
import { core, connectionPluginCore } from "nexus"

declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName> & { totalCount: core.FieldResolver<core.FieldTypeName<TypeName, FieldName>, "totalCount"> }
    ): void
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateClassGroupInput: { // input type
    code?: string | null; // String
    id?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Class: { // root type
    id: string; // String!
    name: string; // String!
  }
  ClassConnection: { // root type
    edges?: Array<NexusGenRootTypes['ClassEdge'] | null> | null; // [ClassEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  ClassEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Class'] | null; // Class
  }
  Mutation: {};
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  Query: {};
  StudentGroup: { // root type
    code: string; // String!
    id: string; // String!
  }
  StudentGroupConnection: { // root type
    edges?: Array<NexusGenRootTypes['StudentGroupEdge'] | null> | null; // [StudentGroupEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  StudentGroupEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['StudentGroup'] | null; // StudentGroup
  }
  Topic: { // root type
    id: string; // String!
    title: string; // String!
  }
  TopicConnection: { // root type
    edges?: Array<NexusGenRootTypes['TopicEdge'] | null> | null; // [TopicEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  TopicEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Topic'] | null; // Topic
  }
  User: { // root type
    email?: string | null; // String
    id: string; // String!
    image?: string | null; // String
    name?: string | null; // String
  }
}

export interface NexusGenInterfaces {
  Node: NexusGenRootTypes['Class'] | NexusGenRootTypes['StudentGroup'] | NexusGenRootTypes['Topic'] | NexusGenRootTypes['User'];
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Class: { // field return type
    group: NexusGenRootTypes['StudentGroup']; // StudentGroup!
    id: string; // String!
    name: string; // String!
    topics: NexusGenRootTypes['TopicConnection'] | null; // TopicConnection
  }
  ClassConnection: { // field return type
    edges: Array<NexusGenRootTypes['ClassEdge'] | null> | null; // [ClassEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount: number | null; // Int
  }
  ClassEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Class'] | null; // Class
  }
  Mutation: { // field return type
    createClass: NexusGenRootTypes['Class'] | null; // Class
    createTopic: NexusGenRootTypes['Topic'] | null; // Topic
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Query: { // field return type
    class: NexusGenRootTypes['Class'] | null; // Class
    classes: NexusGenRootTypes['ClassConnection'] | null; // ClassConnection
    groups: NexusGenRootTypes['StudentGroupConnection'] | null; // StudentGroupConnection
    me: NexusGenRootTypes['User'] | null; // User
  }
  StudentGroup: { // field return type
    code: string; // String!
    id: string; // String!
  }
  StudentGroupConnection: { // field return type
    edges: Array<NexusGenRootTypes['StudentGroupEdge'] | null> | null; // [StudentGroupEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount: number | null; // Int
  }
  StudentGroupEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['StudentGroup'] | null; // StudentGroup
  }
  Topic: { // field return type
    id: string; // String!
    title: string; // String!
  }
  TopicConnection: { // field return type
    edges: Array<NexusGenRootTypes['TopicEdge'] | null> | null; // [TopicEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount: number | null; // Int
  }
  TopicEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Topic'] | null; // Topic
  }
  User: { // field return type
    email: string | null; // String
    id: string; // String!
    image: string | null; // String
    name: string | null; // String
  }
  Node: { // field return type
    id: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Class: { // field return type name
    group: 'StudentGroup'
    id: 'String'
    name: 'String'
    topics: 'TopicConnection'
  }
  ClassConnection: { // field return type name
    edges: 'ClassEdge'
    pageInfo: 'PageInfo'
    totalCount: 'Int'
  }
  ClassEdge: { // field return type name
    cursor: 'String'
    node: 'Class'
  }
  Mutation: { // field return type name
    createClass: 'Class'
    createTopic: 'Topic'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Query: { // field return type name
    class: 'Class'
    classes: 'ClassConnection'
    groups: 'StudentGroupConnection'
    me: 'User'
  }
  StudentGroup: { // field return type name
    code: 'String'
    id: 'String'
  }
  StudentGroupConnection: { // field return type name
    edges: 'StudentGroupEdge'
    pageInfo: 'PageInfo'
    totalCount: 'Int'
  }
  StudentGroupEdge: { // field return type name
    cursor: 'String'
    node: 'StudentGroup'
  }
  Topic: { // field return type name
    id: 'String'
    title: 'String'
  }
  TopicConnection: { // field return type name
    edges: 'TopicEdge'
    pageInfo: 'PageInfo'
    totalCount: 'Int'
  }
  TopicEdge: { // field return type name
    cursor: 'String'
    node: 'Topic'
  }
  User: { // field return type name
    email: 'String'
    id: 'String'
    image: 'String'
    name: 'String'
  }
  Node: { // field return type name
    id: 'String'
  }
}

export interface NexusGenArgTypes {
  Class: {
    topics: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Mutation: {
    createClass: { // args
      group: NexusGenInputs['CreateClassGroupInput']; // CreateClassGroupInput!
      name: string; // String!
    }
    createTopic: { // args
      classId: string; // String!
      title: string; // String!
    }
  }
  Query: {
    class: { // args
      id: string; // String!
    }
    classes: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
    groups: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  Node: "Class" | "StudentGroup" | "Topic" | "User"
}

export interface NexusGenTypeInterfaces {
  Class: "Node"
  StudentGroup: "Node"
  Topic: "Node"
  User: "Node"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "Node";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}