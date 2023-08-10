FROM node
RUN mkdir -p /app
WORKDIR /app
RUN npm install -g yarn --force
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD [ "yarn","start:dev" ]
