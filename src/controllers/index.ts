// export default {};

export { getUsers, registerUser, cin_shot_Check } from "./userController";
export { getAllCenters, getCenter, addCenter, deleteCenter, updateCenter } from "./centerController";
export { createManager, login, isManager, removeManager, getManager, getAllManagers } from "./managerController";
export { loginAdmin } from "./adminController";