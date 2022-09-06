import type { Sequelize } from "sequelize";
import { contacts as _contacts } from "./contacts";
import type { contactsAttributes, contactsCreationAttributes } from "./contacts";
import { usercontact_junction as _usercontact_junction } from "./usercontact_junction";
import type { usercontact_junctionAttributes, usercontact_junctionCreationAttributes } from "./usercontact_junction";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _contacts as contacts,
  _usercontact_junction as usercontact_junction,
  _users as users,
};

export type {
  contactsAttributes,
  contactsCreationAttributes,
  usercontact_junctionAttributes,
  usercontact_junctionCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const contacts = _contacts.initModel(sequelize);
  const usercontact_junction = _usercontact_junction.initModel(sequelize);
  const users = _users.initModel(sequelize);

  usercontact_junction.belongsTo(contacts, { as: "contact", foreignKey: "contactID"});
  contacts.hasMany(usercontact_junction, { as: "usercontact_junctions", foreignKey: "contactID"});
  usercontact_junction.belongsTo(users, { as: "user", foreignKey: "userID"});
  users.hasMany(usercontact_junction, { as: "usercontact_junctions", foreignKey: "userID"});

  return {
    contacts: contacts,
    usercontact_junction: usercontact_junction,
    users: users,
  };
}
