import { createActions, requestActions } from "./createActions";

test("createAction should return object of actions", () => {
  const listUserAction = createActions("LIST_USER", requestActions);

  expect(listUserAction).not.toBeNull();
  expect(listUserAction).toEqual(expect.any(Object));
  expect(listUserAction).toHaveProperty("request");
  expect(listUserAction.request.toString()).toEqual(
    expect.stringMatching(new RegExp("[A-Z]+(_REQUEST)$"))
  );
});
