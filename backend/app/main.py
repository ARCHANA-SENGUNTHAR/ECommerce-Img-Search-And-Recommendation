from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from PIL import Image
from .model_utils import retrieve_similar_images, IMAGES_DIR

# 1️⃣ Create FastAPI app
app = FastAPI(title="Fashion Image Search API")

# 2️⃣ Allow all CORS (for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3️⃣ Mount static files AFTER app is defined
app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")

# 4️⃣ Root endpoint
@app.get("/")
def root():
    return {"message": "Fashion Image Search API Running"}

# 5️⃣ Search endpoint
@app.post("/search/")
async def search_image(file: UploadFile = File(...), top_k: int = 10):
    try:
        print(f"Received file: {file.filename}, top_k: {top_k}")
        # Load uploaded image
        img = Image.open(file.file).convert("RGB")
        print(f"Image loaded successfully, size: {img.size}")
        results = retrieve_similar_images(img, top_k=top_k)
        print(f"Retrieved results: {results}")

        # Return results as list of URLs for frontend
        urls = [f"/images/{img_path}" for img_path in results]
        print(f"Returning URLs: {urls}")
        return {"top_k_results": urls}

    except Exception as e:
        print(f"Error: {str(e)}")
        return {"error": str(e)}
