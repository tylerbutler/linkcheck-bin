import path from "path";
import fs from "fs";
import downloader from "careful-downloader";
import logSymbols from "log-symbols";
import {
  getPkgVersion,
  getReleaseUrl,
  getReleaseFilename,
  getBinFilename,
  getBinVersion,
  getChecksum,
} from "./utils.js";

installBinary()
  .then((bin) =>
    // try querying binary's version via CLI
    getBinVersion(bin),
  )
  .then((version) => {
    // print output of `linkcheck --version` to console
    console.log(`${logSymbols.success} linkcheck installed successfully!`);
    console.log(version);
  })
  .catch((error) => {
    // pass whatever error occured along the way to console
    console.error(`${logSymbols.error} linkcheck installation failed. :(`);
    throw error;
  });

async function installBinary() {
  const version = getPkgVersion();
  const releaseFile = getReleaseFilename(version);
  const checksum = getChecksum(version);
  console.log(`checksum is: ${checksum}`);
  const binFile = getBinFilename();

  // stop here if there's nothing we can download
  if (!releaseFile) {
    throw new Error(`Are you sure this platform is supported? See: https://github.com/filiph/linkcheck/releases/tag/${version}`);
  }

  // download release from GitHub and verify its checksum
  const download = await downloader(getReleaseUrl(version, releaseFile), {
    checksumHash: checksum,
    filename: releaseFile,
    destDir: "vendor",
    algorithm: "sha256",
    extract: true,
  });

  // ensure binary is executable
  fs.chmodSync(path.join(download, binFile), 0o755);

  // return the full path to the binary
  return path.join(download, binFile);
}
