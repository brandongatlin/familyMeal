var Sequelize = require( "sequelize" );

module.exports = function ( sequelize, DataTypes ) {

  var Comment = sequelize.define( 'Comment', {
      text: {
        allowNull: false,
        type: DataTypes.STRING(),

      },

      reader: {
        allowNull: false,
        type: DataTypes.INTEGER(),
      },

      writerId: {
        allowNull: false,
        type: DataTypes.INTEGER(),
      }

    },



    {
      timestamps: true
    } );

  return Comment;

};