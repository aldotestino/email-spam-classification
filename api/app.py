import os
from pydantic import BaseModel
import torch
from transformers import BertTokenizer
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from model.bert_classifier import BERTClassifier
from model.methods import predict_ham_spam

bert_model_name = 'bert-base-cased'
num_classes = 2

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
tokenizer = BertTokenizer.from_pretrained(bert_model_name)
model = BERTClassifier(bert_model_name, num_classes).to(device)
model.load_state_dict(torch.load('model/bert_classifier.pth', map_location=device))
model.eval()

PORT = int(os.environ.get('PORT', 8000))

app = FastAPI()

origins = [
  "*"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

class Data(BaseModel):
  text: str

@app.post('/predict', status_code=status.HTTP_200_OK)
def predict(data: Data):
  return {
    'text': data.text,
    'prediction': predict_ham_spam(data.text, model, tokenizer, device)
  }

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=PORT)
