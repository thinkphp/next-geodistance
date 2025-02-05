from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import math
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API key for OpenCage (replace with your own key)
OPENCAGE_API_KEY = "c9be749ac1184d4fa673c99a0e95f194"

class LocationRequest(BaseModel):
    locationA: str
    locationB: str

def get_coordinates(location):
    url = f"https://api.opencagedata.com/geocode/v1/json?q={location}&key={OPENCAGE_API_KEY}"
    response = requests.get(url).json()
    if response["results"]:
        lat = response["results"][0]["geometry"]["lat"]
        lng = response["results"][0]["geometry"]["lng"]
        return lat, lng
    else:
        raise HTTPException(status_code=400, detail=f"Location '{location}' not found")

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi/2.0)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda/2.0)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

@app.post("/distance")
def calculate_distance(request: LocationRequest):
    lat1, lon1 = get_coordinates(request.locationA)
    lat2, lon2 = get_coordinates(request.locationB)
    distance = haversine(lat1, lon1, lat2, lon2)
    return {"distance": round(distance, 2), "coordsA": [lat1, lon1], "coordsB": [lat2, lon2]}
