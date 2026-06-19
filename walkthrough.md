# Phase 1 Walkthrough

We have successfully completed **Phase 1** of the Trading Learning Application backend! Here is a summary of what has been implemented so far.

## What was implemented

### 1. Project Initialization
- Initialized a Node.js project.
- Installed required dependencies: `express`, `mongoose`, `dotenv`, `bcryptjs`, `jsonwebtoken`, `helmet`, `cors`, and `socket.io`.
- Configured `.env` for environment variables.

### 2. Database & Server Setup
- Created the MongoDB connection setup in `src/config/db.js`.
- Configured the main Express app in `src/app.js` with security middleware (`helmet`, `cors`) and error handling.
- Set up the main server entry point in `server.js` with a basic Socket.IO integration for future use.

### 3. Authentication & User Management
- Created the `User` schema (`src/models/user.model.js`) containing fields like name, email, password, and `virtualBalance` (defaulting to ₹100,000).
- Included pre-save middleware to hash passwords using `bcryptjs`.
- Implemented JWT-based authentication middleware (`src/middleware/auth.middleware.js`).
- Created Auth Controllers (`src/controllers/auth.controller.js`) and Routes (`src/routes/auth.routes.js`) for:
  - **POST /api/auth/register**: To create a new user.
  - **POST /api/auth/login**: To authenticate an existing user.
  - **GET /api/auth/profile**: To fetch the logged-in user's profile details.

## How to Verify Locally

You can test these changes by starting the server locally.

1. Ensure your local MongoDB instance is running (via MongoDB Compass or CLI) on `mongodb://127.0.0.1:27017`.
2. Run the application in development mode:
   ```bash
   cd d:\Rideal\tradebackend
   npm run dev
   ```
3. Use Postman or any API client to test the following routes:
   - `POST http://localhost:5000/api/auth/register` (body: `name`, `email`, `password`)
   - `POST http://localhost:5000/api/auth/login` (body: `email`, `password`)
   - `GET http://localhost:5000/api/auth/profile` (header: `Authorization: Bearer <token>`)

> [!NOTE]
> Let me know if you would like me to proceed with **Phase 4: Dashboard & Trade History**!

---

# Phase 3 Walkthrough

We have successfully completed **Phase 3** of the Trading Learning Application backend!

## What was implemented

### 1. Virtual Trading Engine
- Created the `Trade` schema (`src/models/trade.model.js`) to record buy/sell transactions, including PnL (Profit and Loss).
- Created `trade.controller.js` and `trade.routes.js` with the following protected endpoints:
  - **POST `/api/trade/buy`**: Allows a user to buy stocks using their virtual balance. It deducts the cost, updates the portfolio, and logs the trade.
  - **POST `/api/trade/sell`**: Allows a user to sell stocks they hold. It calculates the PnL, updates the virtual balance, removes/reduces the stock from the portfolio, logs the trade, and automatically updates the user's overall Win Rate.

### 2. Portfolio Management
- Created the `Portfolio` schema (`src/models/portfolio.model.js`) to track current holdings (symbol, quantity, and average buy price).
- Created `portfolio.controller.js` and `portfolio.routes.js` with the following protected endpoints:
  - **GET `/api/portfolio`**: Fetches the user's current holdings, dynamically enriched with live market prices, current value, and profit/loss percentage.
  - **GET `/api/portfolio/summary`**: Calculates high-level metrics like Total Investment, Current Portfolio Value, Total Profit/Loss, and overall Profit/Loss percentage.

## How to Verify Locally

You can test the new endpoints via Postman using a valid JWT Token:

1. **Trade Endpoints (Protected)**
   - **Buy Stock**: `POST http://localhost:5000/api/trade/buy`
     - Body: `{"symbol": "TCS", "quantity": 10}`
   - **Sell Stock**: `POST http://localhost:5000/api/trade/sell`
     - Body: `{"symbol": "TCS", "quantity": 5}`

2. **Portfolio Endpoints (Protected)**
   - **Get Holdings**: `GET http://localhost:5000/api/portfolio`
   - **Get Summary**: `GET http://localhost:5000/api/portfolio/summary`

---

# Phase 2 Walkthrough

We have successfully completed **Phase 2** of the Trading Learning Application backend!

## What was implemented

### 1. Market APIs
- Created a `market.service.js` to simulate a real-time market data feed.
- Created `market.controller.js` and `market.routes.js` with the following endpoints:
  - **GET `/api/stocks`**: Returns a list of available stocks.
  - **GET `/api/stocks/search?keyword=...`**: Search for stocks by symbol or name.
  - **GET `/api/stocks/:symbol`**: Get detailed info including OHLC (Open, High, Low, Close) and market cap.

### 2. Watchlist APIs
- Created the `Watchlist` schema (`src/models/watchlist.model.js`) that references the `User` model and ensures unique stocks per user.
- Created `watchlist.controller.js` and `watchlist.routes.js` with the following protected endpoints:
  - **POST `/api/watchlist`**: Add a stock to the user's watchlist.
  - **GET `/api/watchlist`**: Get the user's watchlist, enriched with current market data.
  - **DELETE `/api/watchlist/:id`**: Remove a stock from the watchlist.

## How to Verify Locally

You can test the new endpoints via Postman:

1. **Market Endpoints (Public)**
   - `GET http://localhost:5000/api/stocks`
   - `GET http://localhost:5000/api/stocks/search?keyword=TCS`
   - `GET http://localhost:5000/api/stocks/RELIANCE`

2. **Watchlist Endpoints (Protected - Requires JWT)**
   - `POST http://localhost:5000/api/watchlist` (body: `{"stockSymbol": "TCS"}`)
   - `GET http://localhost:5000/api/watchlist`
   - `DELETE http://localhost:5000/api/watchlist/<watchlist_id>`
