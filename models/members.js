var Sequelize = require( "sequelize" );

module.exports = function ( sequelize, DataTypes ) {

  var Member = sequelize.define( 'Member', {
      name: {
        allowNull: false,
        type: DataTypes.STRING( 50 ),
        validate: {
          len: [ 1, 50 ]
        }

      },
      number: {
        allowNull: false,
        type: DataTypes.STRING( 20 ),
        validate: {
          len: [ 1, 20 ]
        }

      },
      address: {
        allowNull: false,
        type: DataTypes.STRING( 99 ),
        validate: {
          len: [ 1, 99 ]
        }

      },
      donor: {
        allowNull: false,
        type: DataTypes.BOOLEAN(),
        defaultValue: false

      },
      shelter: {
        allowNull: false,
        type: DataTypes.BOOLEAN(),
        defaultValue: false
      }

    },

    {
      timestamps: true
    } );

  return Member;

};