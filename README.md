<div align="center">
  <img src="https://images.unsplash.com/photo-1518134346374-184f9d21cb29?q=80&w=400&auto=format&fit=crop" width="120" height="120" style="border-radius: 50%" />
  
  # ✨ CARE
  **Craft A Romantic Experience**

  <p>A premium, emotional SaaS platform for crafting deeply personal, digital letters for the people you love.</p>
  
  [Live Demo](#) • [Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started)
</div>

---

## 💌 What is CARE?

CARE is an elegant, modern platform designed to help you express your feelings beautifully. Whether you're saying "I'm sorry", popping the big question, celebrating an anniversary, or just saying "I love you", CARE provides a deeply emotional, interactive, and personalized web experience for your recipient.

Instead of a physical card that gets lost, or a text message that feels impersonal, CARE lets you **craft a little piece of the internet just for them.**

<img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop" width="100%" />

## ✨ Features

- **Dynamic Emotional Intelligence:** The platform analyzes the emotion of your writing (Romantic, Sad, Joyful) and automatically dynamically adjusts the fonts, colors, and background particle effects (Hearts, Rain, Confetti) in real-time.
- **CARE AI Writing Assistant:** A completely custom, floating AI companion built into the editor that understands your context and helps you find the perfect words when you get stuck.
- **Cinematic & Classic Templates:** Choose how you want your letter to feel.
- **YouTube Background Music:** Paste a YouTube URL and it instantly becomes a hidden, autoplaying soundtrack for your letter.
- **Fully Responsive:** Looks breathtaking on a 4K desktop display and feels like a native app on a mobile phone.
- **Privacy-First:** Secure shareable links that are fully uncopyable. Your text cannot be highlighted, images cannot be dragged, and right-clicking is disabled to protect your intimate moments.

## 🛠 Tech Stack

Built with modern web technologies to ensure a lightning-fast, smooth, and premium experience.

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** [PostgreSQL (Supabase)](https://supabase.com)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **AI Integration:** LLM Context-Aware Prompting

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js 18+ installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/swarnavobiswas2005-debug/care.git
   cd care
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root of the project and add your keys:
   ```env
   # Your Supabase PostgreSQL connection string
   DATABASE_URL="postgresql://postgres.[your-project]:[password]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   
   # API Key for the CARE AI (Gemini/OpenAI)
   AI_API_KEY="your_api_key_here"
   ```

4. **Initialize the Database**
   ```bash
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser!

---

<div align="center">
  <i>Made with ❤️ for the ones you love.</i>
</div>
