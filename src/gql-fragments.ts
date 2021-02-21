
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "AssignmentAnswer": [
      "ChoiceQuestionAnswer",
      "NumberQuestionAnswer",
      "TextQuestionAnswer"
    ],
    "Node": [
      "Assignment",
      "AssignmentQuestion",
      "AssignmentSection",
      "AssignmentState",
      "AssignmentVariant",
      "ChoiceQuestionAnswer",
      "Class",
      "NumberQuestionAnswer",
      "StudentGroup",
      "TextQuestionAnswer",
      "Topic",
      "TopicAttachment",
      "User"
    ]
  }
};
      export default result;
    