const presets = [
  [
    "@babel/env",
    {
      targets: {
        node: "current"
      },
      useBuiltIns: "usage",
      corejs: "3.0.0"
    }
  ]
];

module.exports = { presets };
