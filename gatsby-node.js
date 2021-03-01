const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post-contentful.js`)

  const result = await graphql(
    `
      {
        allContentfulPost {
          nodes {
            slug
            title
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulPost.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previous = index === 0 ? null : posts[index - 1].id
      const next = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.slug,
        component: blogPost,
        context: {
          slug: post.slug,
          previous,
          next,
        },
      })
    })
  }
}
