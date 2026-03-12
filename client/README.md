# AtmosIQ(Weather Comfort Ranking App) 

A full-stack weather application that fetches live weather data from the **OpenWeather API**, calculates a **Comfort Index**, and ranks cities from most comfortable to least comfortable based on current weather conditions.

The application consists of:

* **Backend:** Node.js + Express + TypeScript
* **Frontend:** React + Vite + TailwindCSS
* **Weather API:** OpenWeather
* **Caching:** In-memory cache using a `Map` with TTL

---

# 📸 Application Screenshots

###  Application Home Page

![Home Screenshot](./src/assets/home.png)

###  Login

![Login Screenshot](./src/assets/login.png)

###  Logged In User Details

![Logged In User Screenshot](./src/assets/Logged%20In.png)

###  DashBoard With Score

![API Screenshot](./src/assets/Dashboard.png)

###  Comfort Score Visualization

![Comfort Score Screenshot](./src/assets/comScore.png)



---

#  Features

* Fetches real-time weather data from OpenWeather
* Converts temperatures from **Kelvin → Celsius**
* Calculates a **Comfort Index score (0-100)**
* Ranks cities by comfort level
* Uses **caching** to reduce API requests
* Full-stack architecture with modern tooling
* Clean UI built with **React + Tailwind**

---

#  Project Architecture
```

---

#  Setup Instructions

##  Clone the repository

```
git clone 
cd weather-comfort-ranking
```

---

# 🖥 Backend Setup

Navigate to the server folder:

```
cd server
```

Install dependencies:

```
npm install
```

Create a `.env` file:

```

```

Run the backend:

```
npm run dev
```

Build the project:

```
npm run build
```

Start production server:

```
npm start
```

---

#  Frontend Setup

Open a new terminal and go to the client folder:

```
cd client
```

Install dependencies:

```
npm install
```

Run the frontend:

```
npm run dev
```

Build frontend:

```
npm run build
```

Preview production build:

```
npm run preview
```

---

#  Comfort Index Formula

The application calculates a **Comfort Score (0-100)** using four weather factors:

* Temperature
* Humidity
* Wind Speed
* Cloud Cover

The formula evaluates how close the current weather is to ideal conditions.

### Ideal conditions used

| Variable    | Ideal Value |
| ----------- | ----------- |
| Temperature | 22°C        |
| Humidity    | 50%         |
| Wind Speed  | 3 m/s       |
| Cloud Cover | 30%         |

---

## Formula Implementation

```
tempScore = 100 - Math.abs(tempC - 22) * 4
humidityScore = 100 - Math.abs(humidity - 50) * 1.2
windScore = 100 - Math.abs(windSpeed - 3) * 12
cloudScore = 100 - Math.abs(clouds - 30) * 0.5

comfortScore =
  tempScore * 0.4 +
  humidityScore * 0.25 +
  windScore * 0.2 +
  cloudScore * 0.15
```

The result is rounded and clamped between **0 and 100**.

---

#  Reasoning Behind Variable Weights

### Temperature — **40%**

Temperature has the largest effect on comfort. Extreme heat or cold immediately reduces comfort regardless of other conditions.

### Humidity — **25%**

Humidity strongly affects how temperature feels to humans. High humidity makes heat feel worse, while low humidity can feel dry.

### Wind Speed — **20%**

A gentle breeze improves comfort, but strong winds can become uncomfortable.

### Cloud Cover — **15%**

Cloud cover affects sunlight exposure. Moderate cloud cover often improves comfort by reducing direct sunlight.

---

#  Trade-offs Considered

### Simplicity vs Scientific Accuracy

The formula is intentionally simple and easy to understand. More complex meteorological indices exist, but they add complexity and reduce readability.

### Performance vs Data Freshness

Caching improves performance and reduces API usage, but users may temporarily see slightly outdated data.

### Sequential vs Parallel API Requests

Weather data is fetched sequentially for simplicity. Parallel requests could improve speed but increase implementation complexity.

### Current Weather vs Forecast

The system uses current weather data instead of forecast data for faster responses and simpler ranking.

---

#  Cache Design Explanation

The system uses a **simple in-memory cache** implemented with a JavaScript `Map`.

### Cache Structure

```
type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};
```

### Cache Storage

```
const cache = new Map<string, CacheEntry<unknown>>();
```

### Cache Functions

* `getCache(key)` → retrieves cached data
* `setCache(key, data, ttl)` → stores data with expiration
* `getCacheKeys()` → returns active keys
* `clearCache()` → removes all entries

### Expiration Logic

When retrieving data:

1. Check if cache entry exists
2. Verify if it has expired
3. Remove expired entries automatically
4. Return cached data if valid

### Why this approach?

This design was chosen because it is:

* Simple to implement
* Fast for read/write operations
* Ideal for a single-instance server
* Reduces unnecessary external API calls

---

#  Example Data Flow

1️⃣ Client requests ranked weather data
2️⃣ Backend checks cache
3️⃣ If cached data exists → return it
4️⃣ If not cached:

* Fetch weather data from OpenWeather
* Convert temperature Kelvin → Celsius
* Calculate Comfort Score
* Rank cities
* Store results in cache
* Return response

---

#  Known Limitations

### 1. In-memory cache resets on restart

The cache is stored in memory and disappears if the server restarts.

### 2. Not distributed

The cache works only for a single server instance. For scaling, Redis or Memcached would be better.

### 3. Comfort score is heuristic

The formula is designed for ranking convenience rather than scientific accuracy.

### 4. Sequential API calls

Weather requests are currently processed sequentially, which may increase response time with many cities.

### 5. Limited weather variables

The model does not include factors like:

* UV index
* Rain intensity
* Air quality
* "Feels like" temperature

---

# 🌡 Temperature Conversion

OpenWeather returns temperature in **Kelvin** by default.

The application converts it to Celsius using:

```
export function kelvinToCelsius(kelvin: number): number {
  return Number((kelvin - 273.15).toFixed(1));
}
```

This keeps the values user-friendly for display and calculations.

---

#  Backend Dependencies

* express
* axios
* dotenv
* cors
* morgan
* typescript
* ts-node-dev

---

#  Frontend Dependencies

* react
* react-dom
* vite
* tailwindcss
* react-router-dom
* lucide-react
* auth0-react

---

#  Future Improvements

* Replace in-memory cache with **Redis**
* Fetch weather data using **Promise.all for parallel requests**
* Include **weather forecast ranking**
* Add **UV index and air quality**
* Allow configurable comfort score weights
* Improve TypeScript typing for API responses

---



---

#  Author

Developed as part of a weather ranking system demonstrating API integration, caching strategies, and comfort score modeling using modern web technologies.
