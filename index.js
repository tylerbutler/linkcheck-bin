import path from "path";
import { __dirname, getBinFilename } from "./lib/utils.js";

const linkcheck = path.join(
  __dirname,
  "vendor",
  getBinFilename(),
);

// The only thing this module really exports is the absolute path to the binary:
export default linkcheck;
