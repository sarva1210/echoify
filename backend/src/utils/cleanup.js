import fs from "fs";
import path from "path";

export const cleanupYtdlFiles = () => {
  const dir = process.cwd();

  fs.readdir(dir, (err, files) => {
    if (err) return;

    files.forEach((file) => {
      if (file.includes("player-script")) {
        fs.unlink(path.join(dir, file), () => {});
      }
    });
  });
};