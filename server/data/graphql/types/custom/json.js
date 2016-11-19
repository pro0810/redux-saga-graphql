import { GraphQLScalarType, GraphQLError } from 'graphql'
import { Kind } from 'graphql/language'

function coerceDate(value) {
  const json = JSON.stringify(value)
  return json.replace(/\"/g, '\'') // eslint-disable-line
}


// this is for json input, we can get back the object from json string, instead of custom parsing
export const GraphQlJSON = new GraphQLScalarType({
  name: 'Generic',
  serialize: coerceDate,
  parseValue: coerceDate,
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Can only parse strings to buffers but got a: ${ast.kind}`, [ast])
    }

    const json = ast.value.replace(/\'/g, '"') // eslint-disable-line
    return JSON.parse(json)
  }
})