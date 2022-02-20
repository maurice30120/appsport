import React from 'react';
import { fetchAPI } from "../../lib/api"
import { getStrapiMedia } from "../../lib/media"
import { serialize } from 'next-mdx-remote/serialize'
import { Layout } from "../../components/templates/layout"
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';


function Article({ article, categories, source }) {
  const imageUrl = getStrapiMedia(article.attributes.image)

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  }

  return (
    <Layout categories={categories.data} seo={seo}>
      <ReactMarkdown
        source={article.attributes.content}
        escapeHtml={false}
      />
      <h1>test</h1>
      <div className="" data-uk-grid="true">
        <div>
          {article.attributes.author.picture && (
            <Image image={article.attributes.author.picture} />
          )}
        </div>
        <div className="">
          <p className="">
            By {article.attributes.author.name}
          </p>
          <p className="">
            <Moment format="MMM Do YYYY">
              {article.attributes.published_at}
            </Moment>
          </p>
        </div>
      </div>
    </Layout>
  )
}



export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] })

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
  // MDX text - can be from a local file, database, anywhere
  const source = 'Some **mdx** text, with a component <Heading />'
  const mdxSource = await serialize(source)

  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  })
  const categoriesRes = await fetchAPI("/categories")

  return {
    props: {
      article: articlesRes.data[0], categories: categoriesRes,
      source: mdxSource
    },
    revalidate: 1,
  }
}

export default Article

