import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					glow: 'hsl(var(--secondary-glow))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// VLCP Professional color palette
				vlcp: {
					navy: 'hsl(var(--vlcp-navy))',
					'navy-light': 'hsl(var(--vlcp-navy-light))',
					'navy-dark': 'hsl(var(--vlcp-navy-dark))',
					gold: 'hsl(var(--vlcp-gold))',
					'gold-light': 'hsl(var(--vlcp-gold-light))',
					'gold-dark': 'hsl(var(--vlcp-gold-dark))',
					blue: 'hsl(var(--vlcp-blue))',
					'blue-light': 'hsl(var(--vlcp-blue-light))',
					'blue-dark': 'hsl(var(--vlcp-blue-dark))',
					white: 'hsl(var(--vlcp-white))',
					gray: 'hsl(var(--vlcp-gray))',
					'gray-dark': 'hsl(var(--vlcp-gray-dark))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
				'slide-in': 'slideIn 0.5s ease-out forwards',
				'scale-up': 'scaleUp 0.3s ease-out forwards'
			},
			boxShadow: {
				'gold': 'var(--shadow-gold)',
				'blue': 'var(--shadow-blue)',
				'elegant': 'var(--shadow-elegant)'
			},
			backgroundImage: {
				'hero-gradient': 'var(--gradient-hero)',
				'gold-gradient': 'var(--gradient-gold)',
				'blue-gradient': 'var(--gradient-blue)',
				'card-gradient': 'var(--gradient-card)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
