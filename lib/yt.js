const ytdl = require("ytdl-core");
const fs = require("fs");
const { pipeline } = require("stream");
const { promisify } = require("util");
let streamPipeline = promisify(pipeline);

getInfo = async (url, video = false) => {
        return new Promise(async (resolve, reject) => {
            if (!video) {
                const info = await ytdl.getInfo(url);
                const writeAudio = fs.createWriteStream(
                    `temp/${info.videoDetails.title}.mp3`
                );
                const streamAudio = ytdl(url, {
                    filter: "audioonly",
                    quality: "lowest"
                });
                streamPipeline(streamAudio, writeAudio);
                writeAudio.on("finish", () => {
                    resolve(info);
                });
            } else {
                const info = await ytdl.getInfo(url);
                const writeVideo = fs.createWriteStream(
                    `temp/${info.videoDetails.title}.mp4`
                );
                const streamVideo = ytdl(url, {
                    filter: "videoandaudio",
                    quality: "lowest"
                });
                streamPipeline(streamVideo, writeVideo);
                writeVideo.on("finish", () => {
                    resolve(info);
                });
            }
        });
    };
    youtubedl = async (url, video = false) => {
        return new Promise((resolve, reject) => {
            if (!video) {
                Api.getInfo(url).then(info => {
                    const data = {
                        status: true,
                        result: {
                            title: info.videoDetails.title,
                            description: info.videoDetails.description,
                            view: info.videoDetails.viewCount,
                            upload: info.videoDetails.uploadDate,
                            channel: info.videoDetails.ownerChannelName,
                            second: info.videoDetails.lengthSeconds,
                            thumb: info.videoDetails.thumbnails[
                                parseInt(info.videoDetails.thumbnails.length) -
                                    1
                            ].url,
                            path: `temp/${info.videoDetails.title}.mp3`
                        }
                    };
                    resolve(data);
                });
            } else {
                Api.getInfo(url, true).then(info => {
                    const data = {
                        status: true,
                        result: {
                            title: info.videoDetails.title,
                            description: info.videoDetails.description,
                            view: info.videoDetails.viewCount,
                            upload: info.videoDetails.uploadDate,
                            channel: info.videoDetails.ownerChannelName,
                            second: info.videoDetails.lengthSeconds,
                            thumb: info.videoDetails.thumbnails[
                                parseInt(info.videoDetails.thumbnails.length) -
                                    1
                            ].url,
                            path: `temp/${info.videoDetails.title}.mp4`
                        }
                    };
                    resolve(data);
                });
            }
        });
    };