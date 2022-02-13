import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"
import { gql } from "@apollo/client";
import client from "./../../apollo-client";

const Exercice = ({ exercice }) => {

  debugger
  return (
    <Layout categories={[]}>
      <pre>{JSON.stringify(exercice)}</pre>
      <ReactMarkdown
            source={exercice.content}
            escapeHtml={false}
          />
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
            content
            Mouvements {
              __typename
              ... on ComponentSharedExercice {
                title
                content
              }
            }
          }
        }
      }
    }
    `,
  });

  return {
    props: { exercice: data.exercices.data[0].attributes },
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
