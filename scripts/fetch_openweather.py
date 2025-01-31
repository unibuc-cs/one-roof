import json
import random
import math
import requests
from time import sleep

BUCURESTI_COORDS = {"lat": 44.4268, "lon": 26.1025}
RADIUS_KM = 12
POINT_COUNT = 100
OPENWEATHER_API_KEY = "1edc4e7e508513170e1d77d8eebcd7a8"
OUTPUT_FILE = "data/environmental_data.json"


def generate_random_points(center, radius_km, count):
    """Generate random geo-points within a given radius."""
    points = []
    radius_degrees = radius_km / 111.32  # Convert km to degrees

    for _ in range(count):
        angle = random.uniform(0, 2 * math.pi)  # Random angle
        distance = math.sqrt(random.uniform(0, 1)) * radius_degrees  # Random distance

        lat = center["lat"] + distance * math.cos(angle)
        lon = center["lon"] + distance * math.sin(angle)

        points.append({"lat": lat, "lon": lon})

    return points


def fetch_air_pollution(lat, lon):
    """Fetch PM2.5 air pollution data from OpenWeather API."""
    url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data["list"][0]["components"].get("pm2_5", 0)  # Default to 0 if missing
    except requests.RequestException as e:
        print(f"Error fetching air pollution for ({lat}, {lon}): {e}")
        return None


def main():
    """Main function to generate points, fetch data, and save results."""
    points = generate_random_points(BUCURESTI_COORDS, RADIUS_KM, POINT_COUNT)
    environmental_data = []

    for index, point in enumerate(points):
        pm2_5 = fetch_air_pollution(point["lat"], point["lon"])
        environmental_data.append({
            "latitude": point["lat"],
            "longitude": point["lon"],
            "pm2_5": pm2_5,  # Air pollution level
        })

        if index % 10 == 0:
            print(f"Fetched {index+1}/{POINT_COUNT} points...")

        sleep(0.5) # avoid rate limiting

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(environmental_data, f, indent=2)

    print(f"Environmental data saved to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()