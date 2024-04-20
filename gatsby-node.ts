const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }: any) => {
    const result = await graphql(`
        {
            allStrapiPost {
                nodes {
                    title
                    slug
                    locale
                }
            }
        }
    `);

    if (result.errors) {
        return reporter.panicOnBuild(`There was an error loading your Strapi articles`, result.errors);
    }
    const posts = result.data.allStrapiPost.nodes;

    if (posts.length) {
        const { createPage } = actions;
        const postTemplate = path.resolve("./src/templates/post.tsx");

        for (const post of posts) {
            const locale = post.locale === "en" ? "en/" : "";

            createPage({
                path: `/${locale}blog/${post.slug}`,
                component: postTemplate,
                context: {
                    slug: post.slug,
                },
            });
        }
    }
};
