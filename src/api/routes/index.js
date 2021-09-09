const express = require("express");
const dhive = require("@hiveio/dhive");
const router = express.Router();
let opts = {};

//connect to production server
opts.addressPrefix = "STM";
opts.chainId =
  "beeab0de00000000000000000000000000000000000000000000000000000000";
//connect to server which is connected to the network/production
const client = new dhive.Client("https://api.hive.blog");

router.post("/posts", async (req, res) => {
  try {
    const response = await client.database.getDiscussions("trending", req.body);
    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    console.log("error /posts", error);
    return res.status(400).json({
      error,
    });
  }
});

router.post("/post/details", async (req, res) => {
  try {
    const { author, permlink } = req.body;
    const response = await client.database.call("get_content", [
      author,
      permlink,
    ]);
    const comments = await client.database.call("get_content_replies", [
      author,
      permlink,
    ]);
    return res.status(200).json({
      data: { ...response, comments },
    });
  } catch (error) {
    console.log("error /post/details", error);
    return res.status(400).json({
      error,
    });
  }
});

module.exports = router;
