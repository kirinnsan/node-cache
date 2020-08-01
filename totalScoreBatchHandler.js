const { totalScore } = require("./totalScore")

const queues = {};
const cache = {};

module.exports.totalScoreBatchHandler = async (team, callback) => {

  if (cache[team]) {
    console.log(`キャッシュ ${team}: ${cache[team]} にヒットしました。`);
    return process.nextTick(callback.bind(null, null, cache[team]))
  }

  // 同じリクエストが存在する場合
  if (queues[team]) {
    // コールバック関数をキューに追加
    return queues[team].push(callback)
  }

  // コールバック関数をキューに追加
  queues[team] = [callback]

  // スコアの計算
  const score = await totalScore(team)

  // キューに入っている全ての callback 関数に計算結果を渡す
  queues[team].forEach(cb => cb(null, score));

  // キューのクリア
  queues[team] = null;

  // 計算結果をキャッシュの保存
  cache[team] = score

  // キャッシュの削除予約
  scheduleRemoveCache(team);

}

function scheduleRemoveCache(team) {
  function delteCache(team) {
    console.log(`キャッシュ ${team}: ${cache[team]} を削除します`);
    delete cache[team];
  }
  // 10 秒したらキャッシュを削除
  setTimeout(() => delteCache(team), 10 * 1000);
}