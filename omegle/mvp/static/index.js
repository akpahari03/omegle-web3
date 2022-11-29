const tovideo = document.getElementById("tovideo");
const fromvideo = document.getElementById("fromvideo");
const button = document.getElementById("button");
tovideo.volume = 0;
fromvideo.volume = 0;
const { Client } = webRTMP;

let stream;
async function setup() {
  tostream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  fromstream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  })

  tovideo.srcObject = tostream;
  fromvideo.srcObject = fromstream;
  tovideo.play();
  fromvideo.play();
}

setup();

button.onclick = () => {
  const streamKey = { LIVEPEER_STREAM_KEY };
  if (!stream) {
    alert("Video stream not initialized yet.");
  }

  if (!streamKey) {
    alert("Invalid streamKey.");
    return;
  }
  const client = new Client();
  const session = client.cast(stream, streamKey);

  session.on("close", () => {
    console.log("Stream stopped.");
  });

  session.on("error", (err) => {
    console.log("Stream error.", err.message);
  });
};