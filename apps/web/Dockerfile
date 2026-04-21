FROM node:22-slim AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
# [ALCHEMY]: Fallback to npm if pnpm is missing in build context
RUN npm install -g pnpm || true
RUN pnpm install || npm install

COPY . .
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
