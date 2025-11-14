# E-commerce Wishlist

A modern and responsive e-commerce wishlist application built with React and Vite. This project allows users to browse products, add them to a wishlist, and manage their favorite items with a clean and intuitive interface.

## Live Demo

**Frontend**: [https://ecommerce-wishlist-beryl.vercel.app](https://ecommerce-wishlist-beryl.vercel.app)

> ⚠️ **Note**: The backend is hosted on Render's free tier. The first request may take 30-50 seconds as the server wakes up from sleep mode.

## Features

- **Product Listing**: Browse through available products with detailed information including images, ratings, and prices
- **Wishlist Management**: Add and remove products from your personal wishlist
- **Persistent Storage**: Wishlist data is stored in localStorage for persistence across sessions
- **Toast Notifications**: Real-time feedback when adding/removing items from the wishlist
- **Responsive Design**: Fully responsive layout that works seamlessly on mobile, tablet, and desktop
- **Loading States**: Elegant loading indicators for better user experience
- **Error Handling**: Comprehensive error states with user-friendly messages
- **404 Page**: Custom not found page for invalid routes
- **Clean Architecture**: Well-organized component structure with separation of concerns

## Tech Stack

### Frontend
- **React 19** - UI library
- **React Router 7** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped styling
- **Lucide React** - Icon library
- **ESLint** - Code linting
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **CORS** - Cross-origin resource sharing

## Project Structure

```
ecommerce-wishlist/
├── backend/
│   ├── mock-products.json    # Product data
│   ├── server.js             # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Breadcrumb/
│   │   │   ├── Header/
│   │   │   ├── Layout/
│   │   │   ├── LoadingSpinner/
│   │   │   ├── Message/
│   │   │   ├── ProductCard/
│   │   │   └── Toast/
│   │   ├── contexts/         # React contexts
│   │   │   └── ToastContext.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── NotFound/
│   │   │   ├── ProductList/
│   │   │   └── Wishlist/
│   │   ├── routes/           # Route configuration
│   │   │   └── AppRoutes.jsx
│   │   ├── services/         # API and business logic
│   │   │   ├── api.js
│   │   │   └── wishlistService.js
│   │   ├── styles/           # Global styles
│   │   └── main.jsx          # App entry point
│   └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-wishlist
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server** (runs on port 3000)
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend dev server** (runs on port 5173)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## Testing

The project includes unit tests for core functionality using Vitest and React Testing Library.

### Running Tests

```bash
cd frontend
npm test          # Run tests in watch mode
```

### Test Coverage

**wishlistService Tests** (8 tests)
- ✅ Return empty array when wishlist is empty
- ✅ Return stored wishlist items
- ✅ Successfully add product to empty wishlist
- ✅ Prevent adding duplicate products
- ✅ Successfully remove product from wishlist
- ✅ Update localStorage after removal
- ✅ Return true if product exists in wishlist
- ✅ Return false if product does not exist in wishlist

**ProductCard Component Tests** (7 tests)
- ✅ Render product information correctly (name, prices, rating, image)
- ✅ Render heart icon when origin is ProductList
- ✅ Render X icon when origin is Wishlist
- ✅ Render correct number of filled stars based on rating
- ✅ Add product to wishlist when heart icon is clicked
- ✅ Remove product from wishlist when clicking heart on wishlisted item
- ✅ Call onWishlistChange callback when removing from Wishlist page

**Total: 15 tests** covering critical business logic and user interactions.

## Key Features Explained

### Component Architecture
- **Layout Component**: Wraps all pages with a shared header, avoiding duplication
- **Breadcrumb Component**: Provides navigation context with automatic separator rendering
- **Toast System**: Context-based notification system for user feedback
- **Service Layer**: Abstracted API calls and wishlist management logic

### State Management
- React hooks (useState, useEffect) for local state
- Context API for global toast notifications
- localStorage for wishlist persistence

### Styling Approach
- CSS Modules for component-scoped styles
- CSS Custom Properties for theming
- Responsive design with mobile-first approach
- Consistent spacing and color scheme

## Responsive Breakpoints

- Mobile: < 600px
- Tablet: 600px - 1023px
- Desktop: ≥ 1024px

## API Endpoints

- `GET /products` - Fetch all products
