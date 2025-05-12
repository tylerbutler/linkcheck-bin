/* eslint-env node, mocha */
import assert from "assert";
import { execFile } from "child_process";
import { existsSync } from "fs";
import bin from "../index.js";
import { getBinVersion } from "../lib/utils.js";

it("linkcheck exists", async () => {
	console.log(bin);
	assert(existsSync(bin), "linkcheck binary does not exist");
});

it("getBinVersion returns the correct version", async () => {
	const version = await getBinVersion(bin);
	console.log(version);
	assert.equal(
		version,
		"linkcheck version 3.0.0",
		"linkcheck version does not match",
	);
});

it("linkcheck runs", async function () {
	this.timeout(30000); // increase timeout to an excessive 30 seconds for CI

	assert(
		execFile(
			bin,
			["--version"],
			{
				// The shell: true option is required on Windows because the Windows wrapper is a batch file.
				// See https://github.com/nodejs/node/issues/52681#issuecomment-2076426887
				shell: process.platform === "win32",
			},
			(error, stdout) => {
				if (error) {
					throw error;
				}
				console.log(stdout);
			},
		),
	);
});
