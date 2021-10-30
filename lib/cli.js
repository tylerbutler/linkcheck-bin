#!/usr/bin/env node

import { spawn } from "child_process";
import linkcheck from "../index.js";

const args = process.argv.slice(2);

spawn(linkcheck, args, { stdio: "inherit" })
  .on("exit", (code) => {
    // forward linkcheck's exit code so this module itself reports success/failure
    process.exit(code);
  });
