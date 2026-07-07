# MOEX Stock Tracker (In Progress)

A Chrome extension for tracking your Moscow Exchange (MOEX) stocks. Built using WXT, React, and TypeScript.

## Project Overview

This extension tracks MOEX equities. It fetches data from the public MOEX ISS API, which provides stock market data delayed by 15 minutes.

The project demonstrates:

- WXT framework architecture for browser extensions.
- React components with TypeScript types.
- Asynchronous data fetching and client-side storage management.

## Tech Stack

- **Framework:** WXT
- **Frontend:** React, TypeScript
- **Styling**: Tailwind CSS
- **Bundler:** Vite
- **Data Source:** MOEX ISS API (15-minute delayed equities feed)

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/zelmaru/moex-portfolio
   cd moex-portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
