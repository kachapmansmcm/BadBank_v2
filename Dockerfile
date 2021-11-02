FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent && mv node_modules ../
COPY . .
EXPOSE 80
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]