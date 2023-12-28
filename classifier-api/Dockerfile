FROM python:3.9
WORKDIR /usr/src/classifier-api
COPY requirements.txt .
RUN pip install -r ./requirements.txt
COPY . .
EXPOSE 8080
CMD ["python", "app.py"]