import { MDXProvider } from '@mdx-js/react'
import Image from 'next/image'
// import { Heading, Text, Pre, Code, Table } from 'my-components'

const ResponsiveImage = (props) => (
    <Image alt={props.alt} layout="responsive" {...props} />
)

const components = {
    img: ResponsiveImage,
    //   h1: Heading.H1,
    //   h2: Heading.H2,
    //   p: Text,
    //   code: Pre,
    //   inlineCode: Code,
}

export default function MdxWrapper(props) {
    return (
        <MDXProvider components={components}>
            <main {...props} />
        </MDXProvider>
    )
}