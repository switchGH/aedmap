/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`
})

console.log(`Using environment config: '${activeEnv}'`)

module.exports = {
    /* Your site config here */
    plugins: [],
};
