FROM node:16.13.0

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install nodejs -y
RUN apt install ffmpeg
RUN apt install libwebp
RUN apt install imagemagick
RUN npm install

CMD ["npm", "start"]
EXPOSE 5000
