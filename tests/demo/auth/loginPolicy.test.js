import { strict as assert } from "node:assert";
import { isRefreshTokenExpired, login } from "../../../src/demo/auth/loginPolicy.js";

const failed = login({ email: "", password: "" });
assert.equal(failed.ok, false);
assert.equal(failed.status, 401);
assert.equal(failed.error, "INVALID_CREDENTIALS");

assert.equal(isRefreshTokenExpired("2026-01-01T00:00:00Z", new Date("2026-05-18T00:00:00Z")), true);
