# Stage 1: Build and test
FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
RUN npm test -- --coverage

# Stage 2: Production image
FROM node:18
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
RUN npm install --omit=dev
EXPOSE 5000
CMD ["npm", "start"]
