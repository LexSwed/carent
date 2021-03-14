import { useCallback, useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { splitAtom, useAtomCallback, useAtomValue, useUpdateAtom } from 'jotai/utils'
import { AssignmentQuestionType } from '@prisma/client'

const scoreAtom = atom(0)

const typeAtom = atom<AssignmentQuestionType>(AssignmentQuestionType.Text)

type Answer = {
  id: string
  markedCorrect: boolean
} & ({ text: string } | { number?: number } | { content: any })

const answersListAtom = atom<Answer[]>([])
const answersAtomsAtom = splitAtom(answersListAtom)

export function useScoreAtom(scoreProp: number) {
  const [score, setScore] = useAtom(scoreAtom)

  useEffect(() => {
    setScore(scoreProp)
  }, [scoreProp, setScore])

  return [score, setScore] as const
}

export function useSyncedQuestionTypeAtom(typeProp: AssignmentQuestionType) {
  const [type, setScore] = useAtom(typeAtom)

  useEffect(() => {
    setScore(typeProp)
  }, [typeProp, setScore])

  return type
}

export function useQuestionTypeAtom() {
  const [type, setType] = useAtom(typeAtom)
  const updateAnswers = useUpdateAtom(answersListAtom)

  const handleUpdate = useCallback(
    (newType: AssignmentQuestionType) => {
      setType(newType)
      updateAnswers([])
    },
    [setType, updateAnswers]
  )

  return [type, handleUpdate] as const
}

export function useSyncedQuestionAnswers(answersProp: Answer[]) {
  const setAllAnswers = useUpdateAtom(answersListAtom)
  const [answersAtoms] = useAtom(answersAtomsAtom)

  useEffect(() => {
    setAllAnswers(answersProp)
  }, [answersProp, setAllAnswers])

  return answersAtoms
}

export function useAnswers() {
  return useAtom(answersListAtom)
}

export function useAnswersAtoms() {
  return useAtomValue(answersAtomsAtom)
}

export function useDeleteAnswer(id: string) {
  const updateList = useUpdateAtom(answersListAtom)

  return useCallback(() => {
    updateList((list) => list.filter((item) => item.id !== id))
  }, [id, updateList])
}

export function useCreateAnswer() {
  const updateList = useUpdateAtom(answersListAtom)

  return useCallback(
    ({
      markedCorrect = false,
      ...answer
    }: { markedCorrect?: boolean } & ({ text: string } | { number: number } | { content: any })) => {
      updateList((list) => [...list, { ...answer, markedCorrect, id: `${Date.now()}` }])
    },
    [updateList]
  )
}
