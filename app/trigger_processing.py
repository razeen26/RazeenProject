import requests

API_BASE_URL = "https://razeenproject.onrender.com"  # Replace with your Render backend URL

def trigger_image_processing():
    """
    Trigger the image processing endpoint.
    """
    try:
        response = requests.post(f"{API_BASE_URL}/process-images")
        if response.status_code == 200:
            print("Successfully triggered image processing.")
        else:
            print(f"Failed to trigger image processing. Status code: {response.status_code}")
    except Exception as e:
        print(f"Error triggering image processing: {e}")

if __name__ == "__main__":
    trigger_image_processing()
