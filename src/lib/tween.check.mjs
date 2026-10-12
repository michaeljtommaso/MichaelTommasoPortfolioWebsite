// node src/lib/tween.check.mjs : sanity check for bezier() against known CSS easing values.
import assert from "node:assert/strict";
import { bezier } from "./tween.js";

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-3, `${a} vs ${b}`);
near(bezier(0, 0, 1, 1)(0.3), 0.3); // linear
near(bezier(0.25, 0.1, 0.25, 1)(0.5), 0.8024); // CSS "ease" at 50%
near(bezier(0.42, 0, 0.58, 1)(0.5), 0.5); // ease-in-out is symmetric
assert.equal(bezier(0.62, 0, 0.88, 0.45)(0), 0);
assert.equal(bezier(0.62, 0, 0.88, 0.45)(1), 1);
console.log("tween ok");
