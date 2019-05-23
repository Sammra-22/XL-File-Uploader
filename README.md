# XL File Uploader

Docker container running a simple fullstanding app (frontend/backend) that provides a generic way to handle chunked file/video uploads. The client interface is secured using Basic Auth (Credentials set as Env vars but can be found directly in docker-compose).

## Build Docker Image
```
     > cd server && npm install
     > cd ..
     > docker build -t uploader .
```

## Run locally
```
     > docker-compose up
```

Go to http://0.0.0.0/ to access the locally deployed app.