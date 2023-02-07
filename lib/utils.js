import { execFileSync } from "child_process";
import { readPackageUpSync } from "read-pkg-up";
import path from "path";
import { fileURLToPath } from "url";

// https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#what-do-i-use-instead-of-__dirname-and-__filename
export const __dirname = path.dirname(fileURLToPath(import.meta.url));

// This package's version number (should) always match the linkcheck release we want.
// We check for a `linkcheckVersion` field in package.json just in case it doesn't
// match in the future (from pushing an emergency package update, etc.).
export function getPkgVersion() {
  const { packageJson } = readPackageUpSync();
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

/**
 * Returns a URL to a checksums file for the provided version.
 */
export function getChecksum(version) {
  return `https://raw.githubusercontent.com/tylerbutler/linkcheck-bin/main/data/${version}-checksums.txt`;
}
