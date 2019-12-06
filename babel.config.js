const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        node: "10",
        chrome: "58",
        ie: "11"
      }
    }
  ]
];

module.exports = { presets };
