/* eslint-env node, mocha */
import { execFile } from "child_process";
import assert from "assert";
import bin from "../index.js";

it("linkcheck exists and runs?", async function () {
	this.timeout(30000); // increase timeout to an excessive 30 seconds for CI

	console.log(bin);

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
