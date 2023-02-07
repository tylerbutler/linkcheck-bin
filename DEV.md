# Developer notes

## Creating checksum files

Create checksum files for all files in the current folder on Linux using:

```shell
shasum --algorithm 256 ./* > checksums.txt
```
