import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { contacts, contactsId } from './contacts';
import type { users, usersId } from './users';

export interface usercontact_junctionAttributes {
  userContactJunctionID: number;
  userID: number;
  contactID: number;
}

export type usercontact_junctionPk = "userContactJunctionID";
export type usercontact_junctionId = usercontact_junction[usercontact_junctionPk];
export type usercontact_junctionOptionalAttributes = "userContactJunctionID";
export type usercontact_junctionCreationAttributes = Optional<usercontact_junctionAttributes, usercontact_junctionOptionalAttributes>;

export class usercontact_junction extends Model<usercontact_junctionAttributes, usercontact_junctionCreationAttributes> implements usercontact_junctionAttributes {
  userContactJunctionID!: number;
  userID!: number;
  contactID!: number;

  // usercontact_junction belongsTo contacts via contactID
  contact!: contacts;
  getContact!: Sequelize.BelongsToGetAssociationMixin<contacts>;
  setContact!: Sequelize.BelongsToSetAssociationMixin<contacts, contactsId>;
  createContact!: Sequelize.BelongsToCreateAssociationMixin<contacts>;
  // usercontact_junction belongsTo users via userID
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof usercontact_junction {
    return usercontact_junction.init({
    userContactJunctionID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userID'
      }
    },
    contactID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contacts',
        key: 'contactID'
      }
    }
  }, {
    sequelize,
    tableName: 'usercontact_junction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userContactJunctionID" },
        ]
      },
      {
        name: "userID_idx",
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
      {
        name: "contactID_idx",
        using: "BTREE",
        fields: [
          { name: "contactID" },
        ]
      },
    ]
  });
  }
}
