let baby = { identifier: "baby" };

let thing = {
  identifier: "mummy",
  ItemList: { itemListElement: [baby] },
};

const clone = (object) => JSON.parse(JSON.stringify(object));

const cloneThing = (object) =>
  Object.assign({
    ...object,
    ItemList: {
      ...object.ItemList,
      itemListElement: object.ItemList.itemListElement.map(clone),
    },
  });

const ExampleAction = (action) => {
  let result = cloneThing(action.Action.result);
  result.ItemList.itemListElement[0].identifier = "baby2";
  return Object.assign({}, action, {
    mainEntityOfPage: "TakeAction",
    Action: {
      actionStatus: "CompletedActionStatus",
      object: action.Action.result,
      result: result,
    },
  });
};

let a1 = ExampleAction({ Action: { result: thing } });

console.assert(
  a1.Action.result.ItemList.itemListElement[0].identifier !== baby.identifier,
);
