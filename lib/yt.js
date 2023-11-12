const ytdl = require("ytdl-core");
const fs = require("fs");
const { pipeline } = require("stream");
const { promisify } = require("util");
const streamPipeline = promisify(pipeline);

const downloadAndInfo = async (url, type) => {
    return new Promise(async (resolve, reject) => {
        const info = await ytdl.getInfo(url);
        const format = type ? "typeandaudio" : "audioonly";
        const extension = type ? "mp4" : "mp3";

        const writeStream = fs.createWriteStream(
            `temp/${info.typeDetails.title}.${extension}`
        );
        const stream = ytdl(url, { filter: format, quality: "lowest" });

        streamPipeline(stream, writeStream);

        writeStream.on("finish", () => {
            const data = {
                status: true,
                result: {
                    title: info.typeDetails.title,
                    description: info.typeDetails.description,
                    view: info.typeDetails.viewCount,
                    upload: info.typeDetails.uploadDate,
                    channel: info.typeDetails.ownerChannelName,
                    second: info.typeDetails.lengthSeconds,
                    thumb: info.typeDetails.thumbnails[
                        info.typeDetails.thumbnails.length - 1
                    ].url,
                    path: `temp/${info.typeDetails.title}.${extension}`
                }
            };
            resolve(data);
        });
    });
};

module.exports = downloadAndInfo;
