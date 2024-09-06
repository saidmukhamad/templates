from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import httpx
import uvicorn

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

GIGACHAT_API_URL = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"

@app.post("/proxy")
async def proxy(request: Request):
    # Get the Authorization header from the incoming request
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        raise HTTPException(status_code=400, detail="Authorization header is missing")

    # Get the request body
    body = await request.json()

    # Create an async client
    async with httpx.AsyncClient() as client:
        # Forward the request to the GigaChat API
        response = await client.post(
            GIGACHAT_API_URL,
            json=body,
            headers={
                'Authorization': auth_header,
                'Content-Type': 'application/json'
            }
        )

    # Return the response from the GigaChat API
    return JSONResponse(
        content=response.json(),
        status_code=response.status_code,
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)