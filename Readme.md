# Run locally (docker not required)

1. npm i -g azure-functions-core-tools@4 --unsafe-perm true
2. npm install
3. npm start

# Run inside Docker

1. docker build --tag formfiller:latest .
2. docker run -d -p 8080:80 -it formfiller:latest
