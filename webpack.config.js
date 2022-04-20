const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "fhir-api.umd.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      name: "fhirApi",
      type: "umd"
    },
    globalObject: "this"
  },
  mode: "production"
};
