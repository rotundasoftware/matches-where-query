const _ = require( 'underscore' );

module.exports = function( object, whereQuery ) {
	for( const thisKey in whereQuery ) {
		const thisKeyQuery = whereQuery[ thisKey ];
		const thisObjectValue = object[ thisKey ];

		if( _.isObject( thisKeyQuery ) && thisKeyQuery.comparator ) {
			if( ! thisKeyQuery.value ) throw new Error( 'Value must be supplied for comparator queries' );

			switch( thisKeyQuery.comparator ) {
			case 'doesNotEqual':
				if( thisObjectValue === thisKeyQuery.value ) return false;
				break;
			case 'isGreaterThan':
				if( thisObjectValue <= thisKeyQuery.value ) return false;
				break;
			case 'isGreaterThanOrEqualTo':
				if( thisObjectValue < thisKeyQuery.value ) return false;
				break;
			case 'isLessThan':
				if( thisObjectValue >= thisKeyQuery.value ) return false;
				break;
			case 'isLessThanOrEqualTo':
				if( thisObjectValue > thisKeyQuery.value ) return false;
				break;
			case 'isBetween':
				if( ! _.isArray( thisKeyQuery.value ) || thisKeyQuery.value.length !== 2 ) {
					throw new Error( 'Value supplied for isBetween comparator must be an array [ min, max ]' );
				}

				if( thisObjectValue < thisKeyQuery.value[ 0 ] || thisObjectValue > thisKeyQuery.value[ 1 ] ) return false;
				break;
			default:
				throw new Error ( 'Invalid comparator ' + thisKeyQuery.comparator );
			}
		} else if( _.isArray( thisKeyQuery ) ) {
			if( ! _.contains( thisKeyQuery, object[ thisKey ] ) ) return false;
		} else {
			if( thisKeyQuery !== object[ thisKey ] ) return false;
		}
	}

	return true;
};