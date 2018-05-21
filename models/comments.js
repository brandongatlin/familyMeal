var Sequelize = require( "sequelize" );

module.exports = function ( sequelize, DataTypes ) {

  var Comment = sequelize.define( 'Comment', {
      text: {
        allowNull: false,
        type: DataTypes.STRING(),
        validate: {
          min: [ 10 ],
          msg: 'Comment must be at least 10 characters'
        }

      },

      reader: {
        allowNull: false,
        type: DataTypes.INTEGER(),
      },

      writerId: {
        allowNull: false,
        type: DataTypes.INTEGER(),
      },

      writerName: {
        allowNull: false,
        type: DataTypes.STRING(),
      }

    },



    {
      timestamps: true
    } );

  return Comment;

};