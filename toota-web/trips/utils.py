from authentication.models import Driver
import decimal
import datetime
from dotenv import load_dotenv
import requests
load_dotenv()
import aiohttp
import asyncio
import logging
import googlemaps
import os

logger = logging.getLogger(__name__)


def find_nearest_drivers(pickup_lat, pickup_lon, vehicle_type, limit=20):
    """
    Find the nearest available drivers to the given pickup location.
    Returns a list of serialized driver data.
    """
    from .serializers import FindDriversSerializer
    from geopy.distance import geodesic

    if not vehicle_type:
        available_drivers = Driver.objects.filter(is_available=True)
    else:
        available_drivers = Driver.objects.filter(is_available=True, vehicle_type__in=vehicle_type)

    pickup_location = (float(pickup_lat), float(pickup_lon))

    drivers_with_distance = []
    for driver in available_drivers:
        driver_location = (driver.latitude, driver.longitude)
        distance = geodesic(pickup_location, driver_location).km
        drivers_with_distance.append((driver, distance))

    # Sort by distance and limit the results
    sorted_drivers = sorted(drivers_with_distance, key=lambda x: x[1])[:limit]

    # Return only serialized driver data (no distance)
    return [FindDriversSerializer(driver).data for driver, _ in sorted_drivers]

GOOGLE_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

async def get_google_route_data(pickup_lat, pickup_lon, dest_lat, dest_lon):
    url = (
        "https://maps.googleapis.com/maps/api/directions/json"
        f"?origin={pickup_lat},{pickup_lon}"
        f"&destination={dest_lat},{dest_lon}"
        f"&mode=driving&key={GOOGLE_API_KEY}"
    )

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=5) as response:
                data = await response.json()

                if data.get("status") == "OK" and data.get("routes"):
                    leg = data["routes"][0]["legs"][0]
                    distance_km = round(leg["distance"]["value"] / 1000, 2)
                    duration_text = leg["duration"]["text"]

                    return {"distance": distance_km, "duration": duration_text}

    except Exception as e:
        logger.error(f"Google Directions API failed: {e}")


def calculate_easter(year):
    """
    Calculate Easter for the given year (Gregorian calendar)
    using the Anonymous Gregorian algorithm.
    Returns a datetime.date object.
    """
    a = year % 19
    b = year // 100
    c = year % 100
    d = b // 4
    e = b % 4
    f = (b + 8) // 25
    g = (b - f + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i = c // 4
    k = c % 4
    l = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * l) // 451
    month = (h + l - 7 * m + 114) // 31  # Month: 3=March, 4=April
    day = ((h + l - 7 * m + 114) % 31) + 1
    return datetime.date(year, month, day)

def is_peak_hour_or_festive(dt):
    """
    Check if the given datetime (dt) is during peak hours
    (6 PM to 6 AM) or falls on a festive day (New Year, Christmas, or Easter).
    
    Returns True if any condition is met, otherwise False.
    """
    # Check fixed-date festive days: New Year's Day and Christmas.
    fixed_holidays = [
        (1, 1),    # New Year's Day
        (12, 25)   # Christmas Day
    ]
    if (dt.month, dt.day) in fixed_holidays:
        return True

    # Check if it's Easter.
    easter_date = calculate_easter(dt.year)
    if dt.date() == easter_date:
        return True

    # Check for peak hours: from 6 PM (18:00) to 9 AM (09:00).
    if dt.hour >= 18 or dt.hour <= 9:
        return True

    return False


def convert_decimals(obj):
    if isinstance(obj, list):
        return [convert_decimals(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: convert_decimals(value) for key, value in obj.items()}
    elif isinstance(obj, decimal.Decimal):
        return float(obj)
    return obj


async def get_coordinates(address, api_key=os.getenv("GOOGLE_MAPS_API_KEY")):
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": address,
        "key": api_key
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params, timeout=5) as response:
                data = await response.json()

                if data['status'] == 'OK' and data['results']:
                    location = data['results'][0]['geometry']['location']
                    return location['lat'], location['lng']
                else:
                    return None, None
    except (aiohttp.ClientError, asyncio.TimeoutError) as e:
        print(f"Geocode error: {e}")
        return None, None


def reverse_geocode(lat, lng, api_key=os.getenv("GOOGLE_MAPS_API_KEY")):
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "latlng": f"{lat},{lng}",
        "key": api_key
    }
    response = requests.get(url, params=params)
    data = response.json()

    if data['status'] == 'OK':
        return data['results'][0]['formatted_address']
    else:
        return None