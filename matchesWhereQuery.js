var _ = require( 'underscore' );

module.exports = function( object, whereQuery ) {
	var whereQueryKeys = _.keys( whereQuery );
	for( var i = 0; i < whereQueryKeys.length; i++ ) {
		var attributeName = whereQueryKeys[ i ];
		var queryAttribute = whereQuery[ attributeName ];
		var objectAttribute = object[ attributeName ];

		if( _.isObject( queryAttribute ) && queryAttribute.comparator ) {
			if( ! queryAttribute.value ) throw new Error( 'Value must be supplied for comparator queries' );

			switch( queryAttribute.comparator ) {
			case 'doesNotEqual':
				if( objectAttribute === queryAttribute.value ) return false;
				break;
			case 'isGreaterThan':
				if( objectAttribute <= queryAttribute.value ) return false;
				break;
			case 'isGreaterThanOrEqualTo':
				if( objectAttribute < queryAttribute.value ) return false;
				break;
			case 'isLessThan':
				if( objectAttribute >= queryAttribute.value ) return false;
				break;
			case 'isLessThanOrEqualTo':
				if( objectAttribute > queryAttribute.value ) return false;
				break;
			case 'isBetween':
				if( ! _.isArray( queryAttribute.value ) || queryAttribute.value.length !== 2 ) {
					throw new Error( 'Value supplied for isBetween comparator must be an array [ min, max ]' );
				}

				if( objectAttribute < queryAttribute.value[ 0 ] || objectAttribute > queryAttribute.value[ 1 ] ) return false;
				break;
			case 'startsWith':
				if( ! objectAttribute ) return false;
				// eslint-disable-next-line max-len
				if( ! _.isString( objectAttribute ) || ! _.isString( queryAttribute.value ) ) throw new Error( 'For startsWith comparator both the object attribute and the query value must be strings.' );
				if( ! _startsWith( objectAttribute, queryAttribute.value ) ) return false;
				break;
			case 'endsWith':
				if( ! objectAttribute ) return false;
				// eslint-disable-next-line max-len
				if( ! _.isString( objectAttribute ) || ! _.isString( queryAttribute.value ) ) throw new Error( 'For endsWith comparator both the object attribute and the query value must be strings.' );
				if( ! _endsWith( objectAttribute, queryAttribute.value ) ) return false;
				break;
			default:
				throw new Error ( 'Invalid comparator ' + queryAttribute.comparator );
			}
		} else if( _.isArray( queryAttribute ) ) {
			if( ! _.contains( queryAttribute, objectAttribute ) ) return false;
		} else {
			if( queryAttribute !== objectAttribute ) return false;
		}
	}
	return true;
};

function _startsWith( str, starts ) {
	starts = String( starts );
	return str.lastIndexOf( starts, 0 ) === 0;
}

function _endsWith( str, ends ) {
	ends = String( ends );
	var position = str.length - ends.length;

	return position >= 0 && str.indexOf( ends, position ) === position;
}

