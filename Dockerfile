FROM node:18-alpine
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"] /app/
WORKDIR /app
RUN npm install

EXPOSE 3000
CMD ["node", "index.js"]
