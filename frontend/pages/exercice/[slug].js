// import Articles from "../../components/articles"
import Layout from "../../components/layout"
// import Seo from "../../components/seo"

import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { fetchAPI } from "../../lib/api"

const Exercice = ({ exercice, exercices }) => {
  debugger
  // const seo = {
  //   metaTitle: category.attributes.name,
  //   metaDescription: `All ${category.attributes.name} articles`,
  // }

  return (
    // <Layout categories={categories.data}>
    // {/* <Seo seo={seo} /> */ }
    // < div className = "uk-section" >
    //   <div className="uk-container uk-container-large">
    //     {/* <h1>{category.attributes.name}</h1> */}
    //     {/* <Articles articles={category.attributes.articles.data} /> */}
    //   </div>
    //   </div >
    // </Layout>
    < h1 > coucou </h1>
  )
}


export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/exercices", { fields: ["slug"] })

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/exercices", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  })
  const categoriesRes = await fetchAPI("/categories")

  return {
    props: { article: "articlesRes.data[0]", categories: "categoriesRes" },
    revalidate: 1,
  }
}

export default Exercice