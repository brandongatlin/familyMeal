var Sequelize = require( "sequelize" );

module.exports = function ( sequelize, DataTypes ) {

  var Donation = sequelize.define( 'Donation', {
      food_type: {
        allowNull: false,
        type: DataTypes.STRING( 50 ),
        validate: {
          len: [ 1, 50 ]
        }
      },

      food_description: {
        allowNull: false,
        type: DataTypes.STRING( 50 ),
        validate: {
          len: [ 1, 50 ]
        }
      },

      food_quantity: {
        allowNull: false,
        type: DataTypes.INTEGER(),
        validate: {
          len: [ 1, 5 ]
        }
      },

      // posted_by: {
      //   allowNull: false,
      //   type: DataTypes.STRING(),
      //   validate: {
      //     len: [ 1, 50 ]
      //   }
      // },

      claimed_by: {
        allowNull: true,
        type: DataTypes.STRING(),
        validate: {
          len: [ 1, 50 ]
        }
      },

      delivered_by: {
        allowNull: true,
        type: DataTypes.STRING(),
        validate: {
          len: [ 1, 50 ]
        }
      },


    },

    {
      timestamps: true
    } );

  return Donation;

};