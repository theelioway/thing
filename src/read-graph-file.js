"use strict";
import fs from "fs";

export const readGraphFile = (schemaPath) =>
  JSON.parse(fs.readFileSync(schemaPath, "utf-8"))["@graph"];

export default readGraphFile;
