import React from "react";
import { useDispatch } from "react-redux";
import { listUserAction } from "store/user";

export function Main() {
  const dispatch = useDispatch();
  const fetchUser = () => {
    dispatch(listUserAction.request({ userId: 2 }))
  }

  return (
    <div>
      <div>Main</div>
      <button onClick={fetchUser}>
        Fetch User
      </button>
    </div>
  );
}
