import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = styled.div`
  display: flex;
  margin: 10px;
`

const PostImage = styled.div`
  flex: 25%;
  margin-right: 1rem;
`

const PostText = styled.div`
  flex: 75%;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulPost.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title || post.slug

          return (
            <Post key={post.slug}>
              <PostImage>
                <Img fluid={post.image.fluid} />
              </PostImage>
              <PostText>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                  style={{ marginTop: 0 }}
                >
                  <header>
                    <h2>
                      <Link to={post.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                  </header>
                  <section>{post.subtitle}</section>
                </article>
              </PostText>
            </Post>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      nodes {
        title
        subtitle
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        author
        slug
      }
    }
  }
`
