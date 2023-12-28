FROM node
WORKDIR /usr/src/app
COPY package*.json .
RUN yarn
COPY . .
EXPOSE 3000
RUN yarn build
CMD ["yarn", "preview", "--host", "--port", "3000" ]