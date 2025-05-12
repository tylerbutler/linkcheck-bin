#!/usr/bin/env node

import { spawn } from "child_process";
import linkcheck from "../index.js";

const args = process.argv.slice(2);

spawn(linkcheck, args, {
	stdio: "inherit",

  // The shell: true option is required on Windows because the Windows wrapper is a batch file.
  // See https://github.com/nodejs/node/issues/52681#issuecomment-2076426887
	shell: process.platform === "win32",
}).on("exit", (code) => {
	// forward linkcheck's exit code so this module itself reports success/failure
	process.exit(code);
});
