var Sequelize = require( "sequelize" );

module.exports = function ( sequelize, DataTypes ) {

  var Comment = sequelize.define( 'Comment', {
      text: {
        allowNull: true,
        type: DataTypes.STRING(),
        validate: {
          min: [ 10 ],
          msg: 'Comment must be at least 10 characters'
        }

      },

      reviewee: {
        allowNull: true,
        type: DataTypes.STRING(),
      },

      // reviewer: {
      //   allowNull: false,
      //   type: DataTypes.STRING(),
      // }

    },

    {
      timestamps: false
    } );

  return Comment;

};