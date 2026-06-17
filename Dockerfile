FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3002
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app ./

EXPOSE 3002

CMD ["npm", "run", "start"]
