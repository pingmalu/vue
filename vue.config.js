const prod = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: '/vue/',
  baseUrl: prod ? "/vue" : "/",
}