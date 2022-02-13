import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"
import { gql } from "@apollo/client";
import client from "./../../apollo-client";
// import { serialize } from 'next-mdx-remote/serialize'
// import { MDXRemote } from 'next-mdx-remote'
import { Mouvement } from '../../components/MDX/mouvement/index.js'

// export const Heading = () => { return (<h1>ma biiite</h1>) }

// const components = { Heading, Mouvement }

const Exercice = ({ exercice, mouvements }) => {

  return (
    <Layout categories={[]}>
      <h1>Exercice :  {exercice.title}</h1>
      {
        mouvements.map(({ title, mouvement }) => {
          const attributes = mouvement.data.attributes
          return (<Mouvement data={attributes} objectif={""} rest={0}></Mouvement>)
        })
      }
    </Layout>
  )
}


export default Exercice


export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
    query Exo {
      exercices(filters:{slug:{eq:"${params.slug}"}}) {
        data {
          id
          attributes {
            title
            slug
            nombreSeries
            rest
            Mouvements {
              __typename
              ... on ComponentSharedExercice {
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
