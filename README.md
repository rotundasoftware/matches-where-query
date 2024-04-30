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