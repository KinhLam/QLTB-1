import { createContext, useReducer } from "react";

export const UserContext = createContext({
  users: [],
  addUser: ({ name, gender, dateBirth, email, level, majors,classroom}) => {},
  setUser: (user) => {},
  deleteUser: (id) => {},
  updateUser: (id, { name, gender, dateBirth, email, level, majors,classroom }) => {},
});
function usersReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse(); // Phương thức đảo ngược dữ kiện đc thêm vào
      return inverted;
    case "UPDATE":
      const updatableUserIndex = state.findIndex(
        (user) => user.id === action.payload.id
      );
      const updatableUser = state[updatableUserIndex];
      const updatedItem = { ...updatableUser, ...action.payload.data };
      const updatedUsers = [...state];
      updatedUsers[updatableUserIndex] = updatedItem;
      return updatedUsers;
    case "DELETE":
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
}

function UsersContextProvider({ children }) {
  const [usersState, dispatch] = useReducer(usersReducer, []);

  function addUser(userData) {
    dispatch({ type: "ADD", payload: userData });
  }
  function setUser(users) {
    dispatch({ type: "SET", payload: users });
  }
  function updateUser(id, userData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: userData } });
  }
  function deleteUser(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  const value = {
    users: usersState,
    setUser: setUser,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
  };
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}
export default UsersContextProvider;
