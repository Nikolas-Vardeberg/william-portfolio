import { Home } from 'lucide-react'
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
      .title("Hjemmeside")
      .icon(Home)
      .child(
        S.editor()
          .schemaType("homepage")
          .id("homepage")
          .title("Hjemmeside")
      ),
      S.documentTypeListItem("post").title("Prosjekter"),
    ])
