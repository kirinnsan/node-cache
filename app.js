const http = require("http");
const url = require("url");
// const { totalScore } = require("./totalScore");
const { totalScoreBatchHandler } = require("./totalScoreBatchHandler");

http
  .createServer(async (req, res) => {
    const query = url.parse(req.url, true).query;
    // const sum = await totalScore(query.team);
    totalScoreBatchHandler(query.team, (err, sum) => {
      res.writeHead(200);
      res.end(`チーム${query.team}の合計点数は${sum}です。\n`);
    });
  })
  .listen(8080, () => {
    console.log("server is now listening htttp://localhost:8080");
  });