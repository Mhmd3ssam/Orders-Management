import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        overpass: ["Overpass", "sans-serif"],
        "uber-move": ["Roboto", "sans-serif"],
        "uber-move-text": ["Roboto", "sans-serif"],
      },
      fontWeight: {
        bold: 700,
        "semi-bold": 600,
        medium: 500,
        regular: 400,
      },
      fontSize: {
        "xx-large": ["40px", "52px"],
        "x-large": ["36px", "44px"],
        large: ["32px", "40px"],
        medium: ["28px", "36px"],
        small: ["24px", "32px"],
        "x-small": ["20px", "28px"],
        "label-large": ["18px", "24px"],
        "label-medium": ["16px", "20px"],
        "label-small": ["14px", "18px"],
        "label-x-small": ["12px", "16px"],
        "paragraph-large": ["18px", "160%"],
        "paragraph-medium": ["16px", "160%"],
        "paragraph-small": ["14px", "160%"],
        "paragraph-x-small": ["12px", "20px"],
        title: ["24px", "32px"],
        headline: ["20px", "28px"],
        "sub-headline": ["16px", "24px"],
        body: ["14px", "22px"],
        "small-caption": ["10px", "18px"],
      },
      boxShadow: {
        DEFAULT: "0px 6px 12px 0px rgba(32, 48, 79, 0.12)",
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            body: {
              color: theme("colors.black"),
              backgroundColor: theme("colors.primary-bg"),
              fontFamily: theme("fontFamily.roboto"),
              fontWeight: theme("fontWeight.regular"),
              fontSize: theme("fontSize.body"),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
