const express = require( "express" );
const router = express.Router();
const path = require( "path" );
var isAuthenticated = require( "../config/middleware/isAuthenticated" );
const Sequelize = require( "sequelize" )
const Op = Sequelize.Op


var db = require( "../models" );





module.exports = router;