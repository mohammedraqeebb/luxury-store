export function webpack(config) {
   config.watchOptions.poll = 300;
   // config.module.rules.push({
   //    test: /\.svg$/,
   //    use: ["@svgr/webpack"]
   // });
   return config;
}
const path = require('path')

