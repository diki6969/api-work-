const ytdl = require("ytdl-core");
const fs = require("fs");
const { pipeline } = require("stream");
const { promisify } = require("util");
const streamPipeline = promisify(pipeline);

const downloadAndInfo = async (url, video = false) => {
    return new Promise(async (resolve, reject) => {
        const info = await ytdl.getInfo(url);
        const format = video ? "videoandaudio" : "audioonly";
        const extension = video ? "mp4" : "mp3";

        const writeStream = fs.createWriteStream(`temp/${info.videoDetails.title}.${extension}`);
        const stream = ytdl(url, { filter: format, quality: "lowest" });

        streamPipeline(stream, writeStream);

        writeStream.on("finish", () => {
            const data = {
                status: true,
                result: {
                    title: info.videoDetails.title,
                    description: info.videoDetails.description,
                    view: info.videoDetails.viewCount,
                    upload: info.videoDetails.uploadDate,
                    channel: info.videoDetails.ownerChannelName,
                    second: info.videoDetails.lengthSeconds,
                    thumb: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
                    path: `temp/${info.videoDetails.title}.${extension}`
                }
            };
            resolve(data);
        });
    });
};

module.exports = downloadAndInfo;