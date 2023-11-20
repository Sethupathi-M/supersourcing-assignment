# Tasks

1. [x] The form submission should work. (must)
2. [x] The application runs inside the docker container and submits the form.
3. [x] The clean structure of the code should be maintained.
4. [x] Variables and functions should be well-named.
5. [x] A modular approach to solving the problem is a must.
6. [x] Javascript or Typescript is used for the task.
7. [ ] Hosted on AWS (optional and bonus if you do)
   - Tried to do it with Azure, but had few issues would take time. So skipped this.
8. [ ] Nest JS is used to write the application. (bonus - not compulsory)
   - Not used NestJs, so skipped this.

# Run locally (docker not required)

1. npm i -g azure-functions-core-tools@4 --unsafe-perm true
2. npm install
3. npm start

# Run inside Docker

1. docker build --tag formfiller:latest .
2. docker run -d -p 8080:80 -it formfiller:latest
