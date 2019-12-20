let package = require('../package.json');

let banner = `/*!
  * ${package.name} v${package.version}
  * Copyright ${new Date().getFullYear()}, ${package.author}
  * ${package.license} license
  */`;

exports.banner = banner;
