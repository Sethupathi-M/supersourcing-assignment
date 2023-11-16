# Tasks

[x] The form submission should work. (must)
[x] The application runs inside the docker container and submits the form.
[x] The clean structure of the code should be maintained.
[x] Variables and functions should be well-named.
[x] A modular approach to solving the problem is a must.
[x] Javascript or Typescript is used for the task.
[ ] Hosted on AWS (optional and bonus if you do) - Tried to do it with Azure, but had few issues
[ ] Nest JS is used to write the application. (bonus - not compulsory) - Not just NestJs, so skipped this.

# Run locally (docker not required)

1. npm i -g azure-functions-core-tools@4 --unsafe-perm true
2. npm install
3. npm start

# Run inside Docker

1. docker build --tag formfiller:latest .
2. docker run -d -p 8080:80 -it formfiller:latest
