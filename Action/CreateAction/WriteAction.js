import Immutable from "immutable";
import { promises as fs } from "fs";
import Thing from "../../Thing/Thing.js";
import { sortObjectEntriesLowercaseFirst } from "../../src/index.js";

/**
 * Writes `action.Action.object` to a JSON file.
 * @example
 * let WriteAction = require("@elioway/michael/Action/WriteAction.js")
 * let engagedThing = { identifier: "myThing" }
 * const result = await WriteAction({ url: "myThing.json", Action: { object: engagedThing }})
 * console.log(`File written: ${result.url}`)
 */
export const WriteAction = (writeAction) => async (prevAction) => {
  const mainEntityOfPage = "WriteAction";
  writeAction = await Thing({ ...writeAction, mainEntityOfPage });
  writeAction.Action.object = Immutable.fromJS(prevAction.Action.result).toJS();
  if (writeAction && !writeAction.url) {
    writeAction.Action.error = "Missing `action.url`";
    writeAction.Action.actionStatus = "FailedActionStatus";
  } else {
    writeAction.Action.result = Object.fromEntries(
      Object.entries(writeAction.Action.object).sort(
        sortObjectEntriesLowercaseFirst,
      ),
    );
    await fs.writeFile(
      writeAction.url,
      JSON.stringify(writeAction.Action.result, null, 2),
      "utf8",
    );
    writeAction.Action.actionStatus = "CompletedActionStatus";
  }
  return writeAction;
};

export default WriteAction;
