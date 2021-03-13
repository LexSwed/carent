import React from 'react'
import { Button, Flex, Grid, Icon } from '@fxtrot/ui'
import { HiOutlineMenuAlt4, HiOutlinePlus } from 'react-icons/hi'

import Question from './Question'
import { useAppendNewQuestion } from './gql'

interface Props extends QuestionBlockFragment {
  variantId: string
}

const QuestionBlock = (props: Props) => {
  const [addQuestion] = useAppendNewQuestion(props.id, props.variantId)
  return (
    <Grid columns="auto 1fr" gap="$2" css={{ alignItems: 'center' }}>
      <Flex flow="row" space="$1">
        <Button variant="flat" size="sm" onClick={() => addQuestion()}>
          <Icon as={HiOutlinePlus} />
        </Button>
        <Button variant="flat" size="sm">
          <Icon as={HiOutlineMenuAlt4} />
        </Button>
      </Flex>
      <Question {...props} />
    </Grid>
  )
}

export default QuestionBlock
