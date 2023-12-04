import fs from "fs";
import humps from "humps";
import { ThingBuilder, schemaDomainUrl } from "./thing-builder/index.js";

const schemaVersion = "./schemaorg/data/releases/9.0/schemaorg-all-http";
const thingBuilder = new ThingBuilder(schemaVersion, schemaDomainUrl);

const mkdirIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

const writeOut = (thingType, path) => {
  let bright = thingBuilder.Thing(thingType);
  let beautiful = thingBuilder.thinglet(bright, thingType);
  let { comment } = thingBuilder.MODELS.get(thingType);
  mkdirIfNotExists(path);
  fs.writeFileSync(`./${path}/${thingType}.md`, `# ${thingType}\n\n${comment}`);
  fs.writeFileSync(`./${path}/${thingType}.json`, JSON.stringify(bright));
  fs.writeFileSync(
    `./${path}/${humps.camelize(thingType)}.json`,
    JSON.stringify(beautiful),
  );
};

const allThings = (parentType, path) => {
  let childTypes = thingBuilder._listSubs(parentType);
  if (childTypes.length) {
    path = path + "/" + parentType;
    childTypes.forEach((childType) => {
      writeOut(childType, path);
      allThings(childType, path);
    });
  }
};

const rootOfAllThings = "./Things";
mkdirIfNotExists(rootOfAllThings);
writeOut("Thing", rootOfAllThings);
allThings("Thing", rootOfAllThings);
