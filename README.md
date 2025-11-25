# DunkFlow Showcase

A modern, high-performance e-commerce showcase application for Nike SB Dunk sneakers. Built with cutting-edge web technologies to deliver an immersive shopping experience with smooth animations, interactive product views, and a seamless user interface.

![Nike SB Dunk Showcase](https://img.shields.io/badge/Nike-SB%20Dunk-orange?style=for-the-badge&logo=nike)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite)

## 🚀 Features

### Core Functionality
- **Product Showcase**: Immersive hero section with video background and animated product displays
- **Product Detail Pages**: Comprehensive product views including:
  - 360° product rotation
  - Exploded view animations
  - Material showcase with detailed specifications
  - Parallax hero sections
- **Shopping Cart**: Full-featured cart with:
  - Add/remove items
  - Quantity management
  - Persistent storage (localStorage)
  - Real-time price calculations
  - Toast notifications
- **Responsive Design**: Fully responsive layout optimized for all device sizes
- **Smooth Animations**: Powered by GSAP and Framer Motion for fluid, professional animations

### User Experience
- **Interactive Navigation**: Smooth page transitions and scroll-triggered animations
- **Product Gallery**: Animated product cards with hover effects
- **Search Functionality**: Quick product search (UI ready)
- **Mobile Menu**: Responsive navigation with mobile-optimized menu overlay

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Lightning-fast build tool and dev server

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality React component library
- **Radix UI** - Accessible component primitives
- **Framer Motion 12.23.24** - Production-ready motion library
- **GSAP 3.13.0** - Professional-grade animation library

### Routing & State Management
- **React Router DOM 6.30.1** - Client-side routing
- **TanStack Query 5.83.0** - Powerful data synchronization
- **React Context API** - Global state management for cart

### Additional Libraries
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notification system
- **Recharts** - Composable charting library
- **Zod** - TypeScript-first schema validation

## 📦 Installation

### Prerequisites
- **Node.js** 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **npm** or **bun** package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd dunkflow-showcase
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:8080` (or the port shown in terminal)

## 🎯 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## 📁 Project Structure

```
dunkflow-showcase/
├── public/                 # Static assets
│   ├── favicon.svg        # Custom favicon
│   ├── nike-hero.mp4      # Hero video background
│   └── robots.txt
├── src/
│   ├── assets/            # Images and media files
│   │   ├── products-images/
│   │   └── ...
│   ├── components/        # React components
│   │   ├── product/       # Product-specific components
│   │   │   ├── ExplodedView.tsx
│   │   │   ├── HeroParallax.tsx
│   │   │   ├── MaterialShowcase.tsx
│   │   │   └── Product360.tsx
│   │   ├── ui/            # shadcn/ui components
│   │   ├── DetailSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── ...
│   ├── context/           # React Context providers
│   │   └── CartContext.tsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   │   ├── Cart.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   └── ProductDetail.tsx
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Key Components

### Product Showcase
- **Hero Section**: Video background with animated text and call-to-action buttons
- **Scroll Section**: GSAP-powered scroll animations with product reveals
- **Product Chart**: Interactive product grid with hover effects
- **Detail Section**: Product specifications and features

### Product Detail
- **Hero Parallax**: Parallax scrolling hero with product image
- **360° View**: Interactive product rotation
- **Exploded View**: Animated product breakdown
- **Material Showcase**: Detailed material and construction information

### Shopping Cart
- **Cart Management**: Add, remove, and update quantities
- **Persistent Storage**: Cart data saved to localStorage
- **Price Calculation**: Real-time total calculation
- **Toast Notifications**: User feedback for cart actions

## 🔧 Configuration

### Vite Configuration
The project uses Vite with React SWC plugin for fast development and builds. The server is configured to run on port 8080.

### Tailwind CSS
Custom theme configuration with:
- Custom color palette
- Bebas Neue and Inter font families
- Custom animations via `tailwindcss-animate`

### TypeScript
Strict TypeScript configuration with path aliases (`@/` for `src/` directory).

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Options
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **Lovable**: Use the built-in publish feature from the Lovable platform
- **Any Static Host**: Upload the `dist` folder to your hosting provider

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow React best practices and hooks patterns
- Use functional components exclusively
- Maintain consistent naming conventions (PascalCase for components, camelCase for functions)

### Component Structure
- Keep components focused and reusable
- Extract complex logic into custom hooks
- Use TypeScript interfaces for prop types
- Leverage shadcn/ui components when possible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

Built with ❤️ using modern web technologies.

---

**Note**: This project was created with [Lovable](https://lovable.dev) and can be edited both locally and through the Lovable platform.
