const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const { data, errors } = await graphql(`
    {
      allMdx(sort: { fields: [frontmatter___date], order: ASC }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, errors)
    return
  }

  const posts = data.allMdx.nodes

  posts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

    createPage({
      path: post.fields.slug,
      component: require.resolve(`./src/components/Template/index.tsx`),
      context: {
        id: post.id,
        previousPostId,
        nextPostId
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}
