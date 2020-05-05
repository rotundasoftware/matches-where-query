var chai = require( 'chai' );
var matchesWhereQuery = require( '../matchesWhereQuery' );
var expect = chai.expect;

describe( 'Matches where query Test', function() {
	var person;

	beforeEach( function() {
		person = {
			firstName : 'Martin',
			lastName : 'Flores',
			height : 172,
			city : 'Buenos Aires' 
		};
	} );

	describe( 'startsWith', function() {
		it( 'Simple Match', function() {
			var comparator = { firstName : { comparator : 'startsWith', value : 'Mar' } };
	
			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Simple Not Match', function() {
			var comparator = { firstName : { comparator : 'startsWith', value : 'Mer' } };
			var match = matchesWhereQuery( person, comparator );

			expect( match ).to.be.false;
		} );
	} );

	describe( 'endsWith', function() {
		it( 'Simple Match', function() {
			var comparator = { firstName : { comparator : 'endsWith', value : 'tin' } };
			var match = matchesWhereQuery( person, comparator );

			expect( match ).to.be.true;
		} );

		it( 'Simple Not Match', function() {
			var comparator = { firstName : { comparator : 'endsWith', value : 'nit' } };
			var match = matchesWhereQuery( person, comparator );

			expect( match ).to.be.false;
		} );
	} );

	describe( 'Multi-clause query', function() {
		it( 'Match', function() {
			var comparator = {
				firstName : { comparator : 'endsWith', value : 'tin' },
				height : { comparator : 'isGreaterThan', value : 171 }
			};

			var match = matchesWhereQuery( person, comparator );

			expect( match ).to.be.true;
		} );

		it( 'Not match', function() {
			var comparator = {
				firstName : { comparator : 'endsWith', value : 'tin' },
				height : { comparator : 'isLessThanOrEqualTo', value : 171 }
			};

			var match = matchesWhereQuery( person, comparator );

			expect( match ).to.be.false;
		} );
	} );
} );
 