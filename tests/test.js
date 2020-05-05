var chai = require( 'chai' );
var matchesWhereQuery = require( '../matchesWhereQuery' );
var expect = chai.expect;

var people = [ {
	firstName : 'Martin',
	lastName : 'Flores',
	height : 172,
	city : 'Buenos Aires' },
{
	firstName : 'Leonardo',
	lastName : 'Flores',
	height : 166,
	city : 'Buenos Aires' },
{
	firstName : 'Martin',
	lastName : 'Gonzalez',
	height : 171,
	city : 'Rosario' }
];

describe( 'Matches where query Test', function() {
	describe( 'startsWith', function() {
		it( 'Simple Match', function() {
			var comparator = { firstName : { comparator : 'startsWith', value : 'Mar' } };
	
			expect( matchesWhereQuery( people[ 0 ], comparator ) ).to.be.true;
		} );

		it( 'Simple Not Match', function() {
			var comparator = { firstName : { comparator : 'startsWith', value : 'Mar' } };
			var match = matchesWhereQuery( people[ 1 ], comparator );

			expect( match ).to.be.false;
		} );
	} );

	describe( 'endsWith', function() {
		it( 'Simple Match', function() {
			var comparator = { firstName : { comparator : 'endsWith', value : 'tin' } };
			var match = matchesWhereQuery( people[ 0 ], comparator );

			expect( match ).to.be.true;
		} );

		it( 'Simple Not Match', function() {
			var comparator = { firstName : { comparator : 'endsWith', value : 'tin' } };
			var match = matchesWhereQuery( people[ 1 ], comparator );

			expect( match ).to.be.false;
		} );
	} );

	describe( 'Multi-clause query', function() {
		it( 'Match', function() {
			var comparator = {
				firstName : { comparator : 'endsWith', value : 'tin' },
				height : { comparator : 'isGreaterThan', value : 171 }
			};

			var match = matchesWhereQuery( people[ 0 ], comparator );

			expect( match ).to.be.true;
		} );

		it( 'Not match', function() {
			var comparator = {
				firstName : { comparator : 'endsWith', value : 'tin' },
				height : { comparator : 'isGreaterThan', value : 171 }
			};

			var match = matchesWhereQuery( people[ 2 ], comparator );

			expect( match ).to.be.false;
		} );
	} );
} );
 