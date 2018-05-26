var Sequelize = require( "sequelize" );

module.exports = function ( sequelize, DataTypes ) {

  var Donation = sequelize.define( 'Donation', {
      food_type: {
        allowNull: false,
        type: DataTypes.STRING( 50 ),
      },

      food_description: {
        allowNull: false,
        type: DataTypes.STRING( 50 ),
      },

      food_quantity: {
        allowNull: false,
        type: DataTypes.INTEGER(),
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
      },
      //user.id of shelter claiming the donation

      claimedAt: {
        allowNull: true,
        type: DataTypes.DATE(),
      },
      //timestamp for claiming

      deliveredAT: {
        allowNull: true,
        type: DataTypes.STRING(),
      },
      //timestamp of delivery?//

      driver_out: {
        allowNull: true,
        type: DataTypes.DATE(),
      },
      //

      // status_claimed: {
      //   allowNull: true,
      //   type: DataTypes.BOOLEAN()
      // },

      // status_picked_up: {
      //   allowNull: true,
      //   type: DataTypes.BOOLEAN()
      // },

      // status_delivered: {
      //   allowNull: true,
      //   type: DataTypes.BOOLEAN()
      // },


    },

    {
      timestamps: true
    } );

  return Donation;

};