import torch
import os

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "../models/best_triplet_model_2.pth")
FAISS_INDEX_PATH = os.path.join(BASE_DIR, "../data/phase2_faiss.index")
METADATA_PATH = os.path.join(BASE_DIR, "../data/phase2_metadata.json")
IMAGES_DIR = os.path.join(BASE_DIR, "../data/images")
