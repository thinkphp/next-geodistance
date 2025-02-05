![Alt text](https://github.com/thinkphp/next-geolocation/blob/main/Screenshot%20from%202025-02-05%2022-13-55.png?raw=true)


This is the frontend for the Geolocation Distance Calculator app, built with Next.js and React. The app allows users to enter two locations and calculates the distance between them, displaying the result on a map.

## Features

- **Location Input**: Users can input two locations and calculate the distance between them.
- **Distance Calculation**: The app communicates with a FastAPI backend to fetch the calculated distance.
- **Map Integration**: The app displays the locations on a map with markers and a line between the locations.
- **Leaflet Integration**: The map is rendered using the Leaflet library for a smooth and interactive user experience.

## Technologies Used

- **Next.js**: A React framework for building server-rendered and statically generated web applications.
- **React**: A JavaScript library for building user interfaces.
- **Leaflet**: A JavaScript library for interactive maps.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs quickly.
- **Axios / Fetch**: For making HTTP requests to the FastAPI backend.

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/geolocation-frontend.git
cd geolocation-frontend
```

### 2. Install Dependencies

Install the required dependencies:

```bash
npm install
```

### 3. Running the Application

Start the Next.js development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 4. Connect to the Backend

Ensure that the FastAPI backend is running on `http://localhost:8000`. You can follow the backend's README to set it up if you haven't done so already.

### 5. Use the App

Once the app is running:

- Enter two locations (e.g., "New York" and "Los Angeles") in the input fields.
- Click "Calculate Distance" to get the distance between the two locations.
- The app will display the distance and markers on the map.

## Project Structure

- `components/`: Contains reusable UI components, including the map and input fields.
- `pages/`: Contains the main pages of the application (e.g., `index.js`).
- `public/`: Static assets like map marker icons.
- `styles/`: Contains global styles using Tailwind CSS.

## Notes

- The map uses [React Leaflet](https://react-leaflet.js.org/) for rendering, with markers for both locations and a line connecting them.
- The app fetches data from the backend API (FastAPI) to calculate the distance between the entered locations. Make sure the backend is up and running for the app to function properly.



# Geolocation Backend API

This is the backend for the Geolocation Distance Calculator, built with FastAPI. It calculates the distance between two locations using geolocation APIs and the Haversine formula.

## Features

- **Geolocation Lookup**: The backend uses the OpenCage geocoding API to retrieve coordinates for two locations.
- **Distance Calculation**: It uses the Haversine formula to calculate the distance between two geographic coordinates (latitude and longitude).
- **CORS Support**: The API supports Cross-Origin Resource Sharing (CORS) to allow requests from the frontend.

## Technologies Used

- **FastAPI**: A fast and modern web framework for building APIs with Python.
- **OpenCage Geocoding API**: For converting location names into geographic coordinates (latitude and longitude).
- **CORS Middleware**: To allow the frontend application (running on a different origin) to make requests to the API.
- **Python Requests Library**: To make HTTP requests to the OpenCage API.

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/geolocation-backend.git
cd geolocation-backend
```

### 2. Install Dependencies

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### 3. Get an OpenCage API Key

To use the OpenCage API, you'll need to sign up for an API key:

1. Go to [OpenCage Geocoding API](https://opencagedata.com/).
2. Create an account and obtain your API key.
3. Replace the `OPENCAGE_API_KEY` in the `main.py` file with your API key.

### 4. Running the Application

Run the FastAPI application:

```bash
uvicorn main:app --reload
```

This will start the FastAPI server at `http://localhost:8000`.

### 5. Test the API

You can test the `/distance` endpoint using a tool like Postman or CURL by sending a `POST` request with the following JSON body:

```json
{
  "locationA": "New York",
  "locationB": "Los Angeles"
}
```

The response will return the calculated distance and coordinates for both locations:

```json
{
  "distance": 3936.07,
  "coordsA": [40.7128, -74.006],
  "coordsB": [34.0522, -118.2437]
}
```

## API Endpoints

### `/distance` (POST)

Calculates the distance between two locations.

**Request Body:**
```json
{
  "locationA": "string",
  "locationB": "string"
}
```

**Response:**
```json
{
  "distance": "float",
  "coordsA": [lat, lon],
  "coordsB": [lat, lon]
}
```

## Notes

- The API uses the OpenCage Geocoding service to convert location names into geographic coordinates. Ensure that your API key is valid.
- The Haversine formula is used to calculate the great-circle distance between two points on the Earth's surface.
- The API has CORS enabled, so it can be called from a different origin (useful for frontend integration).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
