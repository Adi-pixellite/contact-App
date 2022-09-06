import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { usercontact_junction, usercontact_junctionId } from './usercontact_junction';

export interface contactsAttributes {
  contactID: number;
  contactNumber: string;
  contactFirstName: string;
  contactLastName: string;
}

export type contactsPk = "contactID";
export type contactsId = contacts[contactsPk];
export type contactsOptionalAttributes = "contactID";
export type contactsCreationAttributes = Optional<contactsAttributes, contactsOptionalAttributes>;

export class contacts extends Model<contactsAttributes, contactsCreationAttributes> implements contactsAttributes {
  contactID!: number;
  contactNumber!: string;
  contactFirstName!: string;
  contactLastName!: string;

  // contacts hasMany usercontact_junction via contactID
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

  static initModel(sequelize: Sequelize.Sequelize): typeof contacts {
    return contacts.init({
    contactID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    contactNumber: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contactFirstName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contactLastName: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'contacts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "contactID" },
        ]
      },
    ]
  });
  }
}
