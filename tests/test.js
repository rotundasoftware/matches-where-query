var chai = require( 'chai' );
var matchesWhereQuery = require( '../lib/matchesWhereQuery' );
var expect = chai.expect;

describe( 'Matches where query Test', function() {
	var folder;
	var person;

	beforeEach( function() {
		folder = {
			childrenElements : [
				{ id : 1, type : 'folder' },
				{ id : 2, type : 'opportunity' }
			],
			miscArray : [
				[ 1, 2, 3 ],
				[ 4, 5, 6 ]
			]
		};

		person = {
			firstName : 'Martin',
			lastName : 'Flores',
			height : 172,
			city : 'Buenos Aires',
			age : null,
			permissions : [ 'read', 'write' ]
		};
	} );

	describe( 'Equals (single)', function() {
		it( 'Match', function() {
			var comparator = { firstName : 'Martin' };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not Match', function() {
			var comparator = { firstName : 'Marton' };

			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );
	} );

	describe( 'Equals (array)', function() {
		it( 'Match', function() {
			var comparator = { firstName : [ 'John', 'Peter', 'Martin' ] };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not Match', function() {
			var comparator = { firstName : [ 'John', 'Peter', 'Sarah' ] };

			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );
	} );

	describe( 'doesNotEqual', function() {
		it( 'Match', function() {
			var comparator = { firstName : { comparator : 'doesNotEqual', value : 'Jonh' } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not Match', function() {
			var comparator = { firstName : { comparator : 'doesNotEqual', value : 'Martin' } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );
	} );

	describe( 'isGreaterThan', function() {
		it( 'Match', function() {
			var comparator = { height : { comparator : 'isGreaterThan', value : 170 } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not Match', function() {
			var comparator = { height : { comparator : 'isGreaterThan', value : 180 } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );
	} );

	describe( 'isGreaterThanOrEqualTo', function() {
		it( 'Match', function() {
			var comparator = { height : { comparator : 'isGreaterThanOrEqualTo', value : 172 } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not Match', function() {
			var comparator = { height : { comparator : 'isGreaterThanOrEqualTo', value : 173 } };
			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );
	} );

	describe( 'isLessThan', function() {
		it( 'Match', function() {
			var comparator = { height : { comparator : 'isLessThan', value : 174 } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not Match', function() {
			var comparator = { height : { comparator : 'isLessThan', value : 172 } };
			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );
	} );

	describe( 'isLessThanOrEqualTo', function() {
		it( 'Match', function() {
			var comparator = { height : { comparator : 'isLessThanOrEqualTo', value : 172 } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not Match', function() {
			var comparator = { height : { comparator : 'isLessThanOrEqualTo', value : 171 } };
			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );
	} );

	describe( 'isBetween', function() {
		it( 'Match', function() {
			var comparator = { height : { comparator : 'isBetween', value : [ 171, 176 ] } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not Match - correct array', function() {
			var comparator = { height : { comparator : 'isBetween', value : [ 120, 140 ] } };
			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );

		it( 'Not Match - incorrect comparator values', function() {
			expect( () => matchesWhereQuery( person, { height : { comparator : 'isBetween', value : 2 } } ) ).to.throw();
			expect( () => matchesWhereQuery( person, { height : { comparator : 'isBetween', value : [ 171, 142, 176 ] } } ) ).to.throw();
			expect( matchesWhereQuery( person, { height : { comparator : 'isBetween', value : [ 176, 140 ] } } ) ).to.be.false;
		} );
	} );

	describe( 'startsWith', function() {
		it( 'Simple Match', function() {
			var comparator = { firstName : { comparator : 'startsWith', value : 'Mar' } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Simple Not Match', function() {
			var comparator = { firstName : { comparator : 'startsWith', value : 'Mer' } };
			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );

		it( 'Null Not Match', function() {
			person.firstName = null;
			var comparator = { firstName : { comparator : 'startsWith', value : 'Mer' } };
			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );

		it( 'No a string for startsWith comparator - throws', function() {
			var comparator = { firstName : { comparator : 'startsWith', value : 3 } };

			expect( () => matchesWhereQuery( person, comparator ) ).to.throw();
		} );
	} );

	describe( 'endsWith', function() {
		it( 'Simple Match', function() {
			var comparator = { firstName : { comparator : 'endsWith', value : 'tin' } };
			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Simple Not Match', function() {
			var comparator = { firstName : { comparator : 'endsWith', value : 'nit' } };
			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );

		it( 'Null Not Match', function() {
			person.firstName = null;
			var comparator = { firstName : { comparator : 'startsWith', value : 'Mer' } };
			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );

		it( 'No a string for startsWith comparator - throws', function() {
			var comparator = { firstName : { comparator : 'startsWith', value : 3 } };

			expect( () => matchesWhereQuery( person, comparator ) ).to.throw();
		} );
	} );

	describe( 'Multi-clause query', function() {
		it( 'Match', function() {
			var comparator = {
				firstName : { comparator : 'endsWith', value : 'tin' },
				height : { comparator : 'isGreaterThan', value : 171 }
			};

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not match', function() {
			var comparator = {
				firstName : { comparator : 'endsWith', value : 'tin' },
				height : { comparator : 'isLessThanOrEqualTo', value : 171 }
			};

			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );
	} );

	describe( 'Misc', function() {
		it( 'No value for comparator queries throws', function() {
			var comparator = { firstName : { comparator : 'endsWith' } };

			expect( () => matchesWhereQuery( person, comparator ) ).to.throw();
		} );
	} );

	describe( 'isNull', function() {
		it( 'Match', function() {
			var comparator = { age : { comparator : 'isNull' } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not Match', function() {
			var comparator = { firstName : { comparator : 'isNull' } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );
	} );

	describe( 'isNotNull', function() {
		it( 'Match', function() {
			var comparator = { firstName : { comparator : 'isNotNull' } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not Match', function() {
			var comparator = { age : { comparator : 'isNotNull' } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );
	} );

	describe( 'contains', function() {
		it( 'Match - when attribute is string and value is string', function() {
			var comparator = { firstName : { comparator : 'contains', value : 'ar' } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Not Match - when attribute is string and value is string', function() {
			var comparator = { firstName : { comparator : 'contains', value : 'no' } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );

		it( 'Match - when attribute is array and value is string', function() {
			var comparator = { permissions : { comparator : 'contains', value : 'read' } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.true;
		} );

		it( 'Match - when attribute is array and value is array', function() {
			var comparator = { miscArray : { comparator : 'contains', value : [ 4, 5, 6 ] } };

			expect( matchesWhereQuery( folder, comparator ) ).to.be.true;
		} );

		it( 'Match - when attribute is array and value is object', function() {
			var comparator = { childrenElements : { comparator : 'contains', value : { id : 1, type : 'folder' } } };

			expect( matchesWhereQuery( folder, comparator ) ).to.be.true;
		} );

		it( 'Not Match - when attribute is array and value is string', function() {
			var comparator = { permissions : { comparator : 'contains', value : 'delete' } };

			expect( matchesWhereQuery( person, comparator ) ).to.be.false;
		} );

		it( 'Not Match - when attribute is array and value is array', function() {
			var comparator = { miscArray : { comparator : 'contains', value : [ 7, 8, 9 ] } };

			expect( matchesWhereQuery( folder, comparator ) ).to.be.false;
		} );

		it( 'Not Match - when attribute is array and value is object', function() {
			var comparator = { childrenElements : { comparator : 'contains', value : { id : 3, type : 'folder' } } };

			expect( matchesWhereQuery( folder, comparator ) ).to.be.false;
		} );
	} );
} );
