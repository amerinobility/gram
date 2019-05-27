import {
  graphql,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLString,
  introspectionQuery,
  printSchema,
} from 'graphql'
import { createSchemaBuilder, NodeType, Service } from '..'

describe('testing the example 1', () => {
  it('should build the example code', async () => {
    const builder = createSchemaBuilder()
    let randomNumber: number

    builder.addQuery('random', GraphQLFloat, () => () => {
      randomNumber = Math.random()
      return randomNumber
    })

    const schema = builder.build()

    const result = await graphql({
      schema,
      source: `{ random }`,
    })

    expect(printSchema(schema)).toMatchSnapshot()
    expect(result.data.random).toEqual(randomNumber)
  })
})
