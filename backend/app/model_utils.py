import torch
from torchvision import models, transforms
from PIL import Image
import faiss
import numpy as np
import json
from .config import DEVICE, MODEL_PATH, FAISS_INDEX_PATH, METADATA_PATH

import os

# BASE_DIR = backend folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # backend/app -> backend

# Correct path to images folder
IMAGES_DIR = os.path.join(BASE_DIR, "data", "images")

print("Serving images from:", IMAGES_DIR)  # optional for debugging


# 1️⃣ Transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

# 2️⃣ Load PyTorch model
model = models.resnet50(weights=None)
model.fc = torch.nn.Identity()
model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
model = model.to(DEVICE)
model.eval()

# 3️⃣ Load FAISS index
index = faiss.read_index(FAISS_INDEX_PATH)

# 4️⃣ Load metadata
with open(METADATA_PATH, "r") as f:
    metadata = json.load(f)

# 5️⃣ Build id to path mapping
id_to_path = {}
for root, dirs, files in os.walk(IMAGES_DIR):
    for file in files:
        if file.endswith('.jpg'):
            id_str = os.path.splitext(file)[0]
            rel_path = os.path.relpath(os.path.join(root, file), IMAGES_DIR)
            # Convert Windows backslashes to forward slashes for URLs
            rel_path = rel_path.replace('\\', '/')
            id_to_path[id_str] = rel_path

print(f"Built id_to_path mapping with {len(id_to_path)} images")

# 6️⃣ Function to get embeddings
def get_embedding(img: Image.Image):
    img_tensor = transform(img).unsqueeze(0).to(DEVICE)
    with torch.no_grad():
        emb = model(img_tensor).cpu().numpy().astype('float32')
    return emb


# 7️⃣ Function to search top-K similar images
def retrieve_similar_images(query_img: Image.Image, top_k=20):
    print(f"Getting embedding for query image...")
    emb = get_embedding(query_img)
    print(f"Embedding shape: {emb.shape}")

    print(f"Searching FAISS index for top {top_k} similar images...")
    distances, indices = index.search(emb, top_k)
    print(f"FAISS search results - distances: {distances[0]}, indices: {indices[0]}")

    results = []
    for i in indices[0]:
        img_id = str(metadata[str(i)]["id"])
        print(f"Looking up image ID {img_id} for index {i}")
        if img_id in id_to_path:
            path = id_to_path[img_id]
            results.append(path)
            print(f"Found path: {path}")
        else:
            print(f"Warning: Image ID {img_id} not found in file system")

    # If no results found, return some random existing images as fallback
    if not results:
        print("No matching images found, returning random existing images...")
        all_paths = list(id_to_path.values())
        import random
        results = random.sample(all_paths, min(top_k, len(all_paths)))

    print(f"Final results: {results}")
    return results
