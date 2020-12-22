const fetch = require("node-fetch");

function extractAPIRoverInfo(apiJSON) {
  if (
    !apiJSON ||
    !apiJSON.latest_photos ||
    !apiJSON.latest_photos.length === 0
  ) {
    return {};
  }
  const photos = apiJSON.latest_photos;

  return {
    rover: photos[0].rover.name,
    status: photos[0].rover.status,
    landing_date: photos[0].rover.landing_date,
    launch_date: photos[0].rover.launch_date,
    photo_date: photos[0].earth_date,
    photos: photos.map((photo) => photo.img_src),
  };
}

async function handleRover(req, res) {
  const rover = req.params["rovername"];
  const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers";
  const path = `${baseURL}/${rover}/latest_photos?api_key=${process.env.API_KEY}`;
  try {
    let image = await fetch(path)
      .then((res) => res.json())
      .then((res) => extractAPIRoverInfo(res));
    res.send(image);
  } catch (err) {
    console.log("error:", err);
  }
}

async function handleRovers(req, res) {
  rovers = ["curiosity", "opportunity", "spirit"];
  results = {};
  const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers";

  const requests = rovers.map((rover) => {
    const path = `${baseURL}/${rover}/latest_photos?api_key=${process.env.API_KEY}`;
    return fetch(path)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          results["error"] = res.error.message;
          return;
        }

        results[rover] = extractAPIRoverInfo(res);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  });

  await Promise.all(requests);
  res.send(results);
}

module.exports = {
  handleRover,
  handleRovers,
};
