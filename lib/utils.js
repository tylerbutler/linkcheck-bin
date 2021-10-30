import { execFileSync } from "child_process";
import { readPackageUpSync } from "read-pkg-up";
import * as semver from "semver";

// This package's version number (should) always match the linkcheck release we want.
// We check for a `linkcheckVersion` field in package.json just in case it doesn't
// match in the future (from pushing an emergency package update, etc.).
export function getPkgVersion() {
  const { packageJson } = readPackageUpSync();
  semver.parse(packageJson.version)
  return packageJson.linkcheckVersion || packageJson.version;
}

// Generate the full GitHub URL to a given release file.
export function getReleaseUrl(version, filename) {
  return `https://github.com/filiph/linkcheck/releases/download/${version}/${filename}`;
}

// Binary needs a file extension on windows
export function getBinFilename() {
  return process.platform === "win32" ? "linkcheck/linkcheck.bat" : "linkcheck/linkcheck";
}

// Returns the output of the `linkcheck --version` command, i.e.:
//   "linkcheck version 2.0.20"
export function getBinVersion(bin) {
  const stdout = execFileSync(bin, ["--version"]);
  return stdout.toString().trim();
}

export function getReleaseFilename(version) {
  const { platform, arch } = process;

  const filename =
    // macOS
    platform === "darwin" && arch === "x64" ?
      `linkcheck-${version}-macos-${arch}.tar.gz` :

    // Windows
    platform === "win32" && arch === "x64" ?
      `linkcheck-${version}-windows-${arch}.zip` :

    // Linux
    platform === "linux" && arch === "x64" ?
      `linkcheck-${version}-linux-${arch}.tar.gz` :

    // no binary for this platform
    undefined;

  return filename;
}

const checksums = new Map([
  ["linux", "055d6a261cdf6d833e0ad35ce7e9c4840664c0c113a14556d6e85fc4aa4dbffe"],
  ["darwin", "abd6294a7c13816fef5e2310e2ab76af21a17a2ee91f48e6b4a666648b041d78"],
  ["win32", "633e7203ee8f099af3a9ed70ed6624f377e72fdbf15517a85b02453d6cfcb36c"],
]);

export function getChecksum() {
  const { platform } = process;

  return checksums.get(platform);
}
