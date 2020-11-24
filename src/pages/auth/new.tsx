import { Box, Button, Flex, Heading, TextField } from '@fxtrot/ui'
import React from 'react'

const NewTeacher = () => {
  return (
    <Box width="100vw" height="100vh">
      <Flex
        as="form"
        onSubmit={(e) => {
          e.preventDefault()
          const form = new FormData(e.currentTarget)
          // use apollo client to fill current user name and photo - S3 bucket upload
          // use React
        }}
      >
        <Heading>Welcome!</Heading>
        <TextField name="name" label="Your full name" hint="This will be shown to the students" />
        <Button type="submit">Submit</Button>
      </Flex>
    </Box>
  )
}

export default NewTeacher
