import React from 'react'
import { Button, Flex, Grid, Icon } from '@fxtrot/ui'
import { MenuAlt4Icon, PlusIcon } from '@heroicons/react/outline'

import Question from './Question'
import { useAppendNewQuestion } from './gql'

interface Props extends QuestionBlockFragment {
  variantId: string
}

const QuestionBlock = (props: Props) => {
  const [addQuestion] = useAppendNewQuestion(props.id, props.variantId)
  return (
    <Grid columns="auto 1fr" gap="2" cross="center">
      <Flex flow="row" gap="1">
        <Button variant="flat" size="sm" onClick={() => addQuestion()}>
          <Icon as={PlusIcon} />
        </Button>
        <Button variant="flat" size="sm">
          <Icon as={MenuAlt4Icon} />
        </Button>
      </Flex>
      <Question {...props} />
    </Grid>
  )
}

export default QuestionBlock
