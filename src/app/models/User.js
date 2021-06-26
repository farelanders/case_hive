import Sequelize, { Model } from 'sequelize'

class User extends Model {
  static init (sequelize) {
    super.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING
        },
        name: Sequelize.STRING,
        lastname: Sequelize.STRING,
        nickname: {
          type: 'varchar(30)',
          unique: true
        },
        address: Sequelize.STRING,
        bio: {
          type: 'varchar(100)',
          allowNull: true
        }
      },
      {
        sequelize,
        underscored: false,
        tableName: 'users'
      }
    )
    return this
  }
}

export default User
