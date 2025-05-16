# 🐶 Fetch Dogadoption APP

A responsive, modern React application that allows users to explore adoptable dogs, filter based on preferences, save favorites, and find their perfect match! Built with React, TypeScript, React Query, Tailwind CSS, and modular components.

## 🚀 Features

* 🔍 **Search Dogs:** Browse through a curated list of adoptable dogs.
* 🎛️ **Filters:** Filter by breed, age, size, and more.
* 💓 **Favorites:** Save dogs you love to your favorites list.
* 🧠 **Match Generator:** Use your favorites to generate a perfect match.
* 📱 **Responsive Design:** Optimized for mobile, tablet, and desktop.
* 📦 **Pagination Support:** Seamless navigation through results.
* ⚡ **Performance:** Lazy loading, debounced search, and efficient API calls using React Query.


## 📸 Demo

![Dog Search Demo](https://dogadoption-app.vercel.app/)


## 🛠 Tech Stack

* **React (w/ TypeScript)**
* **Tailwind CSS**
* **React Query**
* **Lucide React Icons**
* **Framer Motion (optional for animations)**
* **Custom Dog API Services**


## 📁 Project Structure

```
src/
├── components/        # Reusable UI components (DogCard, Filters, Modal, etc.)
├── pages/             # Page-level components (Search.tsx)
├── services/          # API utility functions
├── types/             # TypeScript types
└── App.tsx            # Main app entry
```



## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone (https://github.com/vadlapravallika/Dogadoption_App)
  
   ```

2. **Install dependencies**

   ```bash
   npm install
      ```

3. **Run the development server**

   ```bash
   npm run dev
    ```

4. **Visit the app**

   ```
   http://localhost:5173/
   ```

## 🧪 Available Scripts

* `npm run dev` – Runs the app in development mode.
* `npm run build` – Builds the app for production.
* `npm run preview` – Preview production build.

## 🔐 Environment Variables

If you use an external API or auth provider, configure a `.env` file:

```env
VITE_API_BASE_URL=https://api.example.com
```

## 🧩 Component Breakdown

* **DogCard.tsx** – Displays individual dog details.
* **Filters.tsx** – Sidebar for filtering search results.
* **Pagination.tsx** – Handles result pagination.
* **FavoritesList.tsx** – View and manage favorite dogs.
* **MatchModal.tsx** – Showcasing the best match.

## 🎨 Responsive Design

Tailwind CSS utilities are used to ensure responsive layouts:

* `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
* Mobile-first approach
* Sidebar collapses into top content on smaller screens

## 📦 Future Improvements

* 🌍 Add location-based filtering
* 🐕 Infinite scrolling as an alternative to pagination
* 🔎 Search bar with autocomplete
* 💬 Add user login and saved profiles
* 🎉 Shareable dog profiles


## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## 📄 License

MIT License © 2025 Pravallika Vadla
