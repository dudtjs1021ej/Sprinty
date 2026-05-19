import { strict as assert } from "node:assert";
import { retrySlackWebhook } from "../../../src/demo/notify/slackDeployAlert.js";

let attempts = 0;
const result = await retrySlackWebhook("https://hooks.slack.test/demo", { text: "deploy failure" }, async () => {
  attempts += 1;
  return { ok: attempts === 2 };
});

assert.equal(result.ok, true);
assert.equal(result.attempt, 2);
