/** @type {import('tailwindcss').Config} */
export const content = [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
];
export const theme = {
    extend: {
        colors: {
            // Night Drive palette
            bg: "#14161A", // near-black asphalt — page background
            surface: "#1E2127", // cards, nav, form fields
            surfaceAlt: "#262A31", // hover/alt surface, subtle separation
            border: "#2E323A", // hairline borders/dividers
            text: "#F2F1ED", // primary text
            textMuted: "#9A9CA3", // secondary text, captions, labels
            accent: "#FFB400", // headlight amber — primary CTA, prices, highlights
            accentHover: "#E6A200",
            accentSoft: "#3D2A00", // amber tint for badges/backgrounds
            link: "#3D5AFE", // electric blue — links, focus rings, info states
            success: "#2ECC71",
            danger: "#FF5C5C",
        },
        fontFamily: {
            display: ["'Sora'", "sans-serif"], // headings — geometric, confident
            body: ["'Inter'", "sans-serif"], // body copy — clean, readable
        },
        borderRadius: {
            card: "12px",
        },
        boxShadow: {
            glow: "0 0 24px rgba(255, 180, 0, 0.15)", // amber glow for hover states
        },
    },
};
export const plugins = [];