# Weather Dashboard - Next.js 16 (App Router)

A modern, fast, and responsive Weather Dashboard application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. It delivers real-time weather analytics, 5-day weather forecasts, interactive city searches, glassmorphic UI components, and graceful error handling powered by the **OpenWeatherMap API**.

---

## 🌟 Features

- **City Weather Search**: Instant weather lookup for any city worldwide (e.g. *Chennai*, *Hyderabad*, *London*, *Singapore*, *Tokyo*).
- **Current Weather Metrics**:
  - City Name & Country Code
  - Current Temperature (°C)
  - Weather Condition & Icon
  - Feels Like Temperature
  - Humidity (%)
  - Wind Speed (km/h)
  - Atmospheric Pressure (hPa)
  - Visibility Range (km)
  - Local Sunrise & Sunset Times
  - Last Updated Timestamp
- **5-Day Weather Forecast**: Daily forecast cards showing date, condition description, weather icon, and dynamic min/max temperature progress bars.
- **Glassmorphism UI Design**: Ambient lighting effects, translucent blurred panels, glowing borders, smooth hover animations, and dark mode theme.
- **Graceful Loading & Error Handling**: Animated skeleton loading screens and user-friendly error banners for invalid city queries or network issues.
- **Demo Mode & Live API Mode**: Works out of the box with built-in mock data for popular cities when an API key is not present, and seamlessly transitions to live OpenWeatherMap API requests when configured.
- **Fully Responsive**: Optimized for Mobile, Tablet, and Desktop screens.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [OpenWeatherMap API](https://openweathermap.org/api)

---

## 📁 Project Structure

```
Weather/
├── app/
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
├── components/
│   ├── ErrorMessage.tsx
│   ├── Footer.tsx
│   ├── ForecastCard.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   ├── SearchBar.tsx
│   └── WeatherCard.tsx
├── lib/
│   └── weather.ts
├── types/
│   └── weather.ts
├── public/
├── .env.local.example
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔑 Environment Variables

To use live weather data from OpenWeatherMap, create a `.env.local` file in the root directory and add your API key:

```bash
NEXT_PUBLIC_WEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
```

> **Note**: Get a free API key at [OpenWeatherMap API](https://openweathermap.org/api). If `.env.local` is not configured, the application will automatically operate in **Demo Mode** with mock data.

---

## 🚀 Installation & Local Development

### 1. Clone or navigate to the repository
```bash
cd Weather
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the Weather Dashboard.

---

## 🏗 Build & Production Test

To verify TypeScript types and create a production build:

```bash
npm run build
```

To start the production server locally:

```bash
npm run start
```
