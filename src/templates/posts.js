import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/SEO/seo"

import { BlogTitle } from "../styled-components/index"
import { Disqus } from "gatsby-plugin-disqus"

export default ({ pageContext: { frontmatter, html, id } }) => {
  let disqusConfig = {
    identifier: id,
    title: frontmatter.title,
  }

  return (
  <Layout>
    <SEO 
      title={frontmatter.title}
      description={frontmatter.title}
    />
    <BlogTitle>{frontmatter.title}</BlogTitle>
    <div>
        <span> Tweet Author: {frontmatter.twitterName} </span>
    </div>
    <div>
        <time>Time: {new Date(frontmatter.time).toDateString()}</time>
    </div>
    <div>
        {frontmatter.url &&
            <span>
                Source: <a target="_blank=" href={frontmatter.url}>{frontmatter.url}</a>
            </span>
        }
        {frontmatter.short_url &&
            <span>
                Source: <a target="_blank=" href={frontmatter.short_url}>{frontmatter.short_url}</a>
            </span>
        }
    </div>
    <div dangerouslySetInnerHTML={{__html: html}} />
    <br />
    <Disqus config={disqusConfig} />
  </Layout>
)}
