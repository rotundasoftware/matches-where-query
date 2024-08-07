# matchesWhereQuery( object, whereQuery )

This function determines if the provided `object` matches every comparison clause in `whereQuery`, returning `true` or `false` accordingly.

`whereQuery` is an object of the form:


```
{
	<attribute> : <value>
	<attribute> : [ <value1>, ..., <valueN> ]
	<attribute> : { comparator : <comparator> }
	<attribute> : { comparator : <comparator>, value : <value> }
}
```

# Comparisons
For each clause in `whereQuery`, an attribute of `object` is compared to a value (primitive or object.) except in the cases of the `isNull` and `isNotNull` comparators, which do not require for a value to be provided.

## equals (default)
### Single Value
If the attribute is a single value, `object.attribute` must strictly equal the value to result in a match.

```
{
	<attribute> : <value>
}
```

### Array
If the attribute is is an array, only records for which `object.attribute` is strictly equally to one of the elements in the array will result in a match.

```
{
	<attribute> : [ <value1>, ..., <valueN> ]
}
```

## contains

The compared attribute must be a string that contains the provided value, or an array that has at least one element equal to the provided value. In case the attribute is an array, uses `_.isEqual` to perform an optimized deep comparison between the array items and the provided value, to determine if they should be considered equal, allowing to match objects in arrays of objects.

```
{
   <attribute> : { comparator : 'contains', value : <value> }
}

```

## doesNotEqual
The compared attribute must must not be strictly equal to the value to result in a match.

```
{
	<attribute> : { comparator : 'doesNotEqual', value : <value> }
}
```

## isGreaterThan
The compared attribute must be greater than the value to result in a match. `NULL` values are automatically discarded.
```
{
	<attribute> : { comparator : 'isGreaterThan', value : <value> }
}
```

## isGreaterThanOrEqualTo
The compared attribute must be greater than or equal to the value to result in a match. `NULL` values are automatically discarded.

```
{
	<attribute> : { comparator : 'isGreaterThan', value : <value> }
}
```

## isLessThan
The compared attribute must be less than the value to result in a match. `NULL` values are automatically discarded.

```
{
	<attribute> : { comparator : 'isLessThan', value : <value> }
}
```

## isLessThanOrEqualTo
The compared attribute must be less than or equal to the value to result in a match. `NULL` values are automatically discarded.
```
{
	<attribute> : { comparator : 'isLessThanOrEqualTo', value : <value> }
}
```

## isBetween
The compared attribute must be between the minimum and maximum values provided to result in a match. The limits provided are included in the range for the value. `NULL` values are automatically discarded.

```
{
	<attribute> : { comparator : 'isBetween', value : [ <minValue>, <maxValue> ] }
}
```

## startsWith
The compared attribute must be a string that starts with the string value provided to result in a match. `NULL` values are automatically discarded.

```
{
	<attribute> : { comparator : 'startsWith', value : <value> }
}
```

## endsWith
The compared attribute must be a string that ends with the string value provided to result in a match. `NULL` values are automatically discarded.

```
{
	<attribute> : { comparator : 'endsWith', value : <value> }
}
```

## isNull
The compared attribute must be null to result in a match (no value needs to be provided).

```
{
	<attribute> : { comparator : 'isNull' }
}
```

## isNotNull
The compared attribute must not be null to result in a match (no value needs to be provided).

```
{
	<attribute> : { comparator : 'isNotNull' }
}
```
