FROM node:21.7.1-alpine AS builder

WORKDIR /app

# Update NPM version
RUN npm install -g npm@10.2.5
RUN npm install -g vite

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install --loglevel warn
COPY . ./
RUN npm run build

# ==================================
#        Development Build
# ==================================
FROM node:21.7.1-alpine AS development

# Create the app directory and set owner and permissions
RUN mkdir -p /app
RUN chown -R node:node /app && chmod -R 770 /app
WORKDIR /app

COPY --chown=node:node --from=builder /app ./

USER node

EXPOSE 3000
CMD ["npm", "run", "test"]

# ==================================
#        Production Build
# ==================================
FROM nginx:1.25.4-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh

RUN chmod +x /docker-entrypoint.d/env.sh