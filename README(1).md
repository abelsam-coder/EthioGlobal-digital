# EthioGlobal Digital - Official Website
**Ethiopia's Premier Digital Agency Platform**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

[Live Demo](#) • [Report Bug](https://github.com/ethioglobal/website/issues) • [Request Feature](https://github.com/ethioglobal/website/issues)

---

## 📖 Table of Contents
- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Architectural Highlights](#-key-architectural-highlights)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 About The Project
Welcome to the official frontend repository for **EthioGlobal Digital**.

We are a full-service digital agency based in Addis Ababa, Ethiopia. This repository contains our flagship corporate website, designed to showcase our services, portfolio, and provide a seamless gateway for clients to connect with us.

The website is built with a heavy focus on micro-interactions, mobile-first responsiveness, and premium dark-mode UI/UX, reflecting our standard as a top-tier tech agency.

---

## ✨ Features
- 🧭 **Smart Navigation**: Dynamic scroll-tracking navbar with glassmorphism effects and active section highlighting.
- 📱 **100% Responsive**: Flawless transitions from mobile to ultrawide monitors. Includes touch-optimized carousels and mobile-specific bottom sheets.
- 🤖 **Integrated AI Chatbot**: Custom-built "EthioX" assistant with API integration, fallback logic, and drag-to-resize desktop UI.
- 🖼️ **Dynamic Portfolio**: Interactive project showcase with image sliders, swipe gestures, and hover-capable floating stat cards.
- ⚡ **Blazing Fast Performance**: Optimized assets (lazy loading), pure CSS animations, and Vite-powered lightning-fast HMR and builds.
- 🎨 **Premium UI/UX**: Pixel-perfect dark theme with gradient accents, subtle grid backgrounds, and fluid typography scaling.
- 📝 **Interactive Forms**: Validated contact forms with real-time feedback, loading states, and error handling.
- 📜 **Legal Modals**: Mobile-first bottom sheet modals for Privacy Policy and Terms of Service with body scroll locking.

---

## 🛠️ Tech Stack
- **Core Framework:** React.js (Hooks & Context)
- **Tooling:** Vite
- **Styling:** Tailwind CSS (Utility-First)
- **Architecture:** Axios (API Client), RESTful API Integration
- **Assets:** Custom SVG Graphics, Unsplash / Local high-res imagery

---

## 🚀 Getting Started
To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/ethioglobal/website.git
   ```
2. Install dependencies:
   ```bash
   cd website
   npm install
   ```
3. Set up environment variables:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure
```text
src/
├── api/               # Axios instance and API endpoint configurations
├── assets/            # Static assets (images, logos, icons)
├── components/        # Reusable UI components
├── sections/          # Main website sections
│   ├── Header.jsx    # Smart sticky navbar
│   ├── Hook.jsx      # Hero section
│   ├── Service.jsx   # Pricing and services
│   ├── Portfolio.jsx # Case studies & project cards
│   ├── Testimonials.jsx # Client review carousel
│   ├── Owners.jsx    # Founders profile cards
│   ├── Contact.jsx   # Contact form & info
│   ├── Footer.jsx    # Site map, legal modals, socials
│   └── EthioXChat.jsx # AI Chatbot widget
├── App.jsx           # Main app router/component wrapper
├── main.jsx          # React DOM entry point
└── index.css         # Tailwind directives & global styles
```

---

## 🎨 Key Architectural Highlights
1. **Hover-Capable Detection**: Specialized logic for touch vs. mouse interaction.
2. **Mobile-First Modal System**: Performance-optimized slide-up bottom sheets.
3. **Dynamic Carousel Scaling**: Responsive layout adjustments for varied screen sizes.
4. **Touch & Swipe Integration**: Native-feeling mobile gestures.
5. **Advanced Scroll Locking**: Zero-layout-shift scroll management during modal overlays.

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact
**EthioGlobal Digital**

- 📍 **Location:** Hawassa, Ethiopia
- 📧 **Email:** abelsamuel841@gmail.com

Made with ❤️ by the **EthioGlobal Digital Tech Team**
