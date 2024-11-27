import { type SchemaTypeDefinition } from 'sanity'
import { post } from './pages/post.schema'
import { richText, simpleRichText } from './objects/rich-text.schema'
import { homepage } from './pages/homepage.schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, post, simpleRichText, richText],
}
