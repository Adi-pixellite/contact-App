import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { usercontact_junction, usercontact_junctionId } from './usercontact_junction';

export interface usersAttributes {
  userID: number;
  userFirstName: string;
  userLastName: string;
  userContactNumber: string;
  userPassword: string;
}

export type usersPk = "userID";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "userID";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  userID!: number;
  userFirstName!: string;
  userLastName!: string;
  userContactNumber!: string;
  userPassword!: string;

  // users hasMany usercontact_junction via userID
  usercontact_junctions!: usercontact_junction[];
  getUsercontact_junctions!: Sequelize.HasManyGetAssociationsMixin<usercontact_junction>;
  setUsercontact_junctions!: Sequelize.HasManySetAssociationsMixin<usercontact_junction, usercontact_junctionId>;
  addUsercontact_junction!: Sequelize.HasManyAddAssociationMixin<usercontact_junction, usercontact_junctionId>;
  addUsercontact_junctions!: Sequelize.HasManyAddAssociationsMixin<usercontact_junction, usercontact_junctionId>;
  createUsercontact_junction!: Sequelize.HasManyCreateAssociationMixin<usercontact_junction>;
  removeUsercontact_junction!: Sequelize.HasManyRemoveAssociationMixin<usercontact_junction, usercontact_junctionId>;
  removeUsercontact_junctions!: Sequelize.HasManyRemoveAssociationsMixin<usercontact_junction, usercontact_junctionId>;
  hasUsercontact_junction!: Sequelize.HasManyHasAssociationMixin<usercontact_junction, usercontact_junctionId>;
  hasUsercontact_junctions!: Sequelize.HasManyHasAssociationsMixin<usercontact_junction, usercontact_junctionId>;
  countUsercontact_junctions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    userID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userFirstName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    userLastName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    userContactNumber: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    userPassword: {
      type: DataTypes.STRING(405),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userID" },
        ]
      },
    ]
  });
  }
}
