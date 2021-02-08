import { useRouter } from 'next/router'

export function copyText(text: string) {
  return navigator.clipboard.writeText(text)
}

export function useClassId() {
  const { query } = useRouter()

  return query.classId as string
}

export function useTopicId() {
  const { query } = useRouter()

  return query.topicId as string
}

export function useAssignmentId() {
  const { query } = useRouter()

  return query.assignmentId as string
}
