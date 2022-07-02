FROM node:16

# Change working diroctory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy project files
COPY . .

# Start server
CMD ["node", "index.js"]