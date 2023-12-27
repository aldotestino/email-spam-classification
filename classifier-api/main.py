import torch
from sklearn.model_selection import train_test_split
from torch.utils.data import DataLoader
from transformers import BertTokenizer, get_linear_schedule_with_warmup
from torch.optim import AdamW

from constants import BERT_MODEL_NAME, NUM_CLASSES
from model.bert_classifier import BERTClassifier
from model.methods import train, evaluate
from utility.custom_email_dataset import EmailClassificationDataset
from utility.utils import load_data

data_file1 = "data/spam_ham_dataset.csv"
data_file2 = "data/SMSSpamCollection.csv"
texts1, labels1 = load_data(data_file1)
texts2, labels2 = load_data(data_file2)
texts = texts1 + texts2
labels = labels1 + labels2

# Set up parameters
max_length = 128
batch_size = 16
num_epochs = 4
learning_rate = 2e-5

train_texts, val_texts, train_labels, val_labels = train_test_split(texts, labels, test_size=0.2, random_state=42)

tokenizer = BertTokenizer.from_pretrained(BERT_MODEL_NAME)
train_dataset = EmailClassificationDataset(train_texts, train_labels, tokenizer, max_length)
val_dataset = EmailClassificationDataset(val_texts, val_labels, tokenizer, max_length)
train_dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
val_dataloader = DataLoader(val_dataset, batch_size=batch_size)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = BERTClassifier(BERT_MODEL_NAME, NUM_CLASSES).to(device)

optimizer = AdamW(model.parameters(), lr=learning_rate)
total_steps = len(train_dataloader) * num_epochs
scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0, num_training_steps=total_steps)

for epoch in range(num_epochs):
    print(f"Epoch {epoch + 1}/{num_epochs}")
    train(model, train_dataloader, optimizer, scheduler, device)
    accuracy, report = evaluate(model, val_dataloader, device)
    print(f"Validation Accuracy: {accuracy:.4f}")
    print(report)

torch.save(model.state_dict(), "model/bert_classifier.pth")
