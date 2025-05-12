import time
import json
import websocket
import threading

uri = "ws://localhost:8000/ws/trips/drivers/all/"

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0NjcyMTIxLCJpYXQiOjE3NDQ2Njg1MjEsImp0aSI6IjZmODYzMDljMDg1NTRmMThiZGJhNmI4ZGQyOTZhNDczIiwidXNlcl9pZCI6IjgzYjVmMzQ0LTQwYTktNDYyMy1iNDg3LWNlM2ZhNDMwNzFiZSJ9.BhsN_CdVSo72LOYr-nAd5INe2PiZUyPQ4tWMbVGF3qI"
headers = {
    "Authorization": f"Bearer {token}"
}

def on_message(ws, message):
    print("Received from server:", message)

def on_error(ws, error):
    print("WebSocket error:", error)

def on_close(ws, close_status_code, close_msg):
    print("WebSocket closed:", close_status_code, close_msg)

def on_open(ws):
    data = {
        "user_latitude": 6.611076277873283,
        "user_longitude": 3.308898458863701,
    }
    ws.send(json.dumps(data))
    print("Sent data to server:", data)

def run_websocket():
    ws = websocket.WebSocketApp(uri,
                                 header=headers,
                                 on_message=on_message,
                                 on_error=on_error,
                                 on_close=on_close,
                                 on_open=on_open)
    ws.run_forever()

def create_connection_with_retries(max_retries=5, retry_delay=2):
    retries = 0
    while retries < max_retries:
        print(f"Attempting connection... (Attempt {retries + 1})")
        ws_thread = threading.Thread(target=run_websocket)
        ws_thread.start()

        # Give some time for the connection to establish
        time.sleep(5)

        if not ws_thread.is_alive():
            print("Connection failed or dropped. Retrying...")
            retries += 1
            time.sleep(retry_delay)
        else:
            print("WebSocket connected successfully.")
            return ws_thread

    print("Max retries reached. WebSocket connection failed.")

# Run it
create_connection_with_retries()
