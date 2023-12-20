import Immutable from "immutable";
import Thing from "../../Thing/Thing.js";

/**
 * An action performed by a direct agent and indirect participants upon
 * a direct object. */
export const TakeAction = (takeAction) => async (thing) => {
  const mainEntityOfPage = "TakeAction";
  takeAction = await Thing({ ...takeAction, mainEntityOfPage });
  takeAction.Action.object = Immutable.fromJS(thing).toJS();
  takeAction.Action.result = Immutable.fromJS(thing).toJS();
  takeAction.Action.actionStatus = "CompletedActionStatus";
  return takeAction;
};

export default TakeAction;
