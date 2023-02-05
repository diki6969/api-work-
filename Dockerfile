FROM node:16.13.0

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
