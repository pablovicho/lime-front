FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build
EXPOSE 4173
CMD ["pnpm", "run", "preview", "--host", "0.0.0.0", "--port", "4173"]
