const { data } = require("./data");

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const total = (team) => {
  let sum = 0;
  for (const item of data) {
    if (item.team === team) sum += item.point;
  }
  return sum;
};

module.exports.totalScore = (team) => {
  return new Promise(async (resolve, reject) => {
    console.log(`チーム: ${team} の集計処理を開始します。`);
    const sum = total(team);
    await sleep(5000);
    console.log(`チーム: ${team} の集計処理が完了しました。`);
    resolve(sum);
  });
};