
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "AssignmentAnswer": [
      "Choice",
      "NumberQuestion",
      "TextQuestion"
    ],
    "Node": [
      "Assignment",
      "AssignmentAnswerOption",
      "AssignmentQuestion",
      "AssignmentQuestionCorrectAnswer",
      "AssignmentSection",
      "AssignmentState",
      "AssignmentVariant",
      "Class",
      "StudentGroup",
      "Topic",
      "TopicAttachment",
      "User"
    ]
  }
};
      export default result;
    