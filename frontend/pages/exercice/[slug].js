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
    </Layout>
  )
}


export default Exercice


export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
    query Exo {
      exercices(filters:{slug:{eq:"dips"}}) {
        data {
          id
          attributes {
            title
            slug
          }
        }
      }
    }
    `,
  });

  return {
    props: { exercice: data },
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
