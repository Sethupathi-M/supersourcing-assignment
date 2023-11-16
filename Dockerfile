# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:3.0-appservice
FROM mcr.microsoft.com/azure-functions/node:4-node16

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

ENV PLAYWRIGHT_BROWSERS_PATH=0

COPY . /home/site/wwwroot

RUN cd /home/site/wwwroot && \
    rm -rf node_modules && \
    rm -f package-lock.json && \
    npm cache clean --force && \
    # npm install -g npm@latest && \
    npm install --verbose && \
    npm run build

ARG PLAYWRIGHT_V=1.19.1
ARG PLAYWRIGHT_EDGE_V=1.18.1
ARG PLAYWRIGHT_CHROME_V=1.18.1

RUN npx playwright@$PLAYWRIGHT_EDGE_V install msedge
RUN npx playwright@$PLAYWRIGHT_CHROME_V install chrome
RUN npx playwright@$PLAYWRIGHT_V install-deps