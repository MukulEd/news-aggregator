# FROM node

# WORKDIR /app/frontend


# COPY . .

# RUN npm install --include=dev


# EXPOSE 5173
# CMD npm run dev

# FROM node:16

# WORKDIR /app/frontend

# COPY package.json .

# RUN npm i

# COPY . .

# EXPOSE 5173

# CMD npm run dev

FROM node:16.13.2-alpine

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm","run","dev"]


