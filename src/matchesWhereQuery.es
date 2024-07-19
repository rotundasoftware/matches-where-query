import _ from 'underscore';

module.exports = function( object, whereQuery ) {
	for( const attributeName in whereQuery ) {
		const queryAttribute = whereQuery[ attributeName ];
		const objectAttribute = object[ attributeName ];

		if( _.isObject( queryAttribute ) && queryAttribute.comparator ) {
			if( _.isUndefined( queryAttribute.value ) && ! [ 'isNull', 'isNotNull' ].includes( queryAttribute.comparator ) ) throw new Error( 'Value must be supplied for comparator queries' );

			switch( queryAttribute.comparator ) {
			case 'doesNotEqual':
				if( objectAttribute === queryAttribute.value ) return false;
				break;
			case 'isGreaterThan':
				if( ! objectAttribute || objectAttribute <= queryAttribute.value ) return false;
				break;
			case 'isGreaterThanOrEqualTo':
				if( ! objectAttribute || objectAttribute < queryAttribute.value ) return false;
				break;
			case 'isLessThan':
				if( ! objectAttribute || objectAttribute >= queryAttribute.value ) return false;
				break;
			case 'isLessThanOrEqualTo':
				if( ! objectAttribute || objectAttribute > queryAttribute.value ) return false;
				break;
			case 'isBetween':
				if( ! _.isArray( queryAttribute.value ) || queryAttribute.value.length !== 2 ) {
					throw new Error( 'Value supplied for isBetween comparator must be an array [ min, max ]' );
				}
				if( ! objectAttribute || objectAttribute < queryAttribute.value[ 0 ] || objectAttribute > queryAttribute.value[ 1 ] ) return false;
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
			case 'isNull':
				if( ! _.isNull( objectAttribute ) ) return false;
				break;
			case 'isNotNull':
				if( _.isNull( objectAttribute ) ) return false;
				break;
			case 'contains':
				if( ! objectAttribute ) return false;
				if ( _.isString( objectAttribute ) ) {
					return objectAttribute.includes( queryAttribute.value );
				} else if ( _.isArray( objectAttribute ) ) {
					return objectAttribute.some( value => _.isEqual( value, queryAttribute.value ) );
				} else {
					return false;
				}
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
	return str.lastIndexOf( starts, 0 ) === 0;
}

function _endsWith( str, ends ) {
	const position = str.length - ends.length;

	return position >= 0 && str.indexOf( ends, position ) === position;
}

