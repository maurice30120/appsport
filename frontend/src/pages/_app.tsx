import './../../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext } from 'react'
import Head from 'next/head'
import client from './../../apollo-client'
import { ApolloProvider } from "@apollo/client";
import App from 'next/app'
import { getStrapiMedia } from '../../lib/media'
import { fetchAPI } from '../../lib/api'
import { Provider } from 'react-redux'
import { store } from '../entity/store'

export const GlobalContext = createContext({})
function MyApp({ Component, pageProps }: AppProps) {

  const { global } = pageProps
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>

      <GlobalContext.Provider value={global.attributes}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
      </GlobalContext.Provider>
    </>
  )
}

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  })
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } }
}


export default MyApp
