import { gql } from "@apollo/client"
import { useState } from "react"
import client from "../../../apollo-client"
import { Button } from "../../../components/atoms/button"
import { Layout } from "../../../components/templates/layout"
import { fetchAPI } from "../../../lib/api"
import { Mouvement } from "../../../MDX/mouvement"
import { toggleExercice, useAppDispatch } from "../../entity/store"



function Exercice({ exercice, mouvements }) {
  const dispatch = useAppDispatch()

  const [currentSerie, setCurrentSerie] = useState(0)

  const clickHandler = () => {
    debugger
    dispatch(toggleExercice())
  }
  return (

    <Layout categories={[]} seo={undefined}>
      <div>
        <h1>Exercice :  {exercice.title}</h1>
        {
          mouvements.map(({ title, mouvement }) => {
            const attributes = mouvement.data.attributes
            return (<Mouvement key={mouvement.data.id} data={attributes} objectif={""} rest={0}></Mouvement>)
          })
        }

        <Button onClick={clickHandler}>coucou</Button>
      </div>

    </Layout>
  )


}


export default Exercice


export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
    query Exo {
      exercices(filters: { slug: { eq: "dips" } }) {
        data {
          id
          attributes {
            title
            slug
            nombreSeries
            rest
            Mouvements {
              ... on ComponentSharedExercice {
                id
                title
                objectif
                rest
                mouvement {
                  ...FragMouvement
                }
              }
            }
          }
        }
      }
    }
    
    fragment FragMouvement on MouvementEntityResponse {
      data {
        id
        attributes {
          slug
          images {
            ...FragImages
          }
          Title
          content
        }
      }
    }
    
    fragment FragImages on UploadFileRelationResponseCollection {
      data {
        id
        attributes {
          name
          alternativeText
          url
        }
      }
    }
    
    `,
  });

  // MDX text - can be from a local file, database, anywhere
  const mouvements = data.exercices.data[0].attributes.Mouvements
  // const mdxSource = await serialize(content)

  return {
    props: { exercice: data.exercices.data[0].attributes, mouvements: mouvements },
    revalidate: 1,
  }


}


export async function getStaticPaths() {
  const exercicesRes = await fetchAPI("/exercices", { fields: ["slug"] })

  return {
    paths: exercicesRes.data.map((exercice) => ({
      params: {
        slug: exercice.attributes.slug,
      },
    })),
    fallback: false,
  }
}
