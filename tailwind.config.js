module.exports = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
    fontFamily: {
      display: ["Agrandir Grand", "sans-serif"],
      body: ["HelveticaNowText-Regular", "sans-serif"]
    },
    borderWidth: {
      default: "1px",
      "0": "0",
      "2": "2px",
      "4": "4px"
    },
    extend: {
      colors: {
        blue: "#0B0BEC"
      },
      spacing: {
        "96": "24rem",
        "128": "32rem"
      }
    }
  },
  variants: {},
  plugins: [require("postcss-import"), require("postcss-custom-properties")]
};
