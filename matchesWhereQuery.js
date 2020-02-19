var _ = require( 'underscore' );

module.exports = function( object, whereQueryObject ) {
	for( const thisKey in whereQueryObject ) {
		const thisKeyQuery = whereQueryObject[ thisKey ];

		if( _.isArray( thisKeyQuery ) ) {
			if( ! _.contains( thisKeyQuery, object[ thisKey ] ) ) return false;
		} else {
			if( thisKeyQuery !== object[ thisKey ] ) return false;
		}
	}

	return true;
}