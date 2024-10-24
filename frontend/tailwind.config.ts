import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },

            keyframes: {
                bounceLeftToRight: {
                    "0%": { transform: "translateX(0)" },
                    "25%": { transform: "translateY(-50%)" },
                    "50%": { transform: "translateX(50%)" },
                    "75%": { transform: "translateY(50%)" },
                    "100%": { transform: "translateX(100%)" },
                },
                //
                infinite: {
                    "0%": {
                        transform: "translateX(-150%) translateY(0%) rotate(0deg)",
                        opacity: "0",
                    },
                    "6.25%": {
                        transform: "translateX(-112.5%) translateY(-25%) rotate(-45deg)",
                        opacity: "0.5",
                    },
                    "12.5%": {
                        transform: "translateX(-75%) translateY(-50%) rotate(-90deg)",
                        opacity: "1",
                    },
                    "18.75%": {
                        transform: "translateX(-37.5%) translateY(-25%) rotate(-135deg)",
                        opacity: "1",
                    },
                    "25%": {
                        transform: "translateX(0%) translateY(0%) rotate(-180deg)",
                        opacity: "1",
                    },
                    "31.25%": {
                        transform: "translateX(37.5%) translateY(25%) rotate(-225deg)",
                        opacity: "1",
                    },
                    "37.5%": {
                        transform: "translateX(75%) translateY(50%) rotate(-270deg)",
                        opacity: "1",
                    },
                    "43.75%": {
                        transform: "translateX(112.5%) translateY(25%) rotate(-315deg)",
                        opacity: "1",
                    },
                    "50%": {
                        transform: "translateX(150%) translateY(0%) rotate(-360deg)",
                        opacity: "1",
                    },
                    "56.25%": {
                        transform: "translateX(112.5%) translateY(-25%) rotate(-405deg)",
                        opacity: "1",
                    },
                    "62.5%": {
                        transform: "translateX(75%) translateY(-50%) rotate(-450deg)",
                        opacity: "1",
                    },
                    "68.75%": {
                        transform: "translateX(37.5%) translateY(-25%) rotate(-495deg)",
                        opacity: "1",
                    },
                    "75%": {
                        transform: "translateX(0%) translateY(0%) rotate(-540deg)",
                        opacity: "1",
                    },
                    "81.25%": {
                        transform: "translateX(-37.5%) translateY(25%) rotate(-585deg)",
                        opacity: "1",
                    },
                    "87.5%": {
                        transform: "translateX(-75%) translateY(50%) rotate(-630deg)",
                        opacity: "1",
                    },
                    "93.75%": {
                        transform: "translateX(-112.5%) translateY(25%) rotate(-675deg)",
                        opacity: "1",
                    },
                    "100%": {
                        transform: "translateX(-150%) translateY(0%) rotate(-720deg)",
                        opacity: "0",
                    },
                },
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
                "bounce-left-to-right": "bounceLeftToRight 3s linear infinite",
                "infinite-spin": "infinite 5s linear infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
