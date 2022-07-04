FROM node:16-alpine as build-stage

# Change working diroctory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy project files
COPY . .

# Build for production
RUN yarn build

FROM nginx:1.22-alpine

# Copy to NGINX public diroctry
COPY --from=build-stage /usr/src/app/build /var/www/html

# Copy NGINX configuration
COPY nginx/nginx.conf /etc/nginx

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]