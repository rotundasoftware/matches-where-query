# matchesWhereObject( object, whereQueryObject )

This function determines if the provided `object` matches every comparison clause in `whereQueryObject`, returning `true` or `false` accordingly.

`whereQueryObject` is an object of the form:


```
{
	<attribute> : <value>
	<attribute> : [ <value1>, ..., <valueN> ]
	<attribute> : { comparator : <comparator>, value : <value> }
}
```

# Comparisons
For each clause in `whereQueryObject`, an attribute of `object` is compared to a value (primitive or object.)

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

## doesNotEquals
The compared attribute must must not be strictly equal to the value to result in a match.

```
{
	<attribute> : { comparator : 'doesNotEqual', value : <value> }
}
```

## isGreaterThan
The compared attribute must be greater than the value to result in a match.
```
{
	<attribute> : { comparator : 'isGreaterThan', value : <value> }
}
```

## isGreaterThanOrEqualTo
The compared attribute must be greater than or equal to the value to result in a match.

```
{
	<attribute> : { comparator : 'isGreaterThan', value : <value> }
}
```

## isLessThan
The compared attribute must be less than the value to result in a match.

```
{
	<attribute> : { comparator : 'isLessThan', value : <value> }
}
```

## isLessThanOrEqualTo
The compared attribute must be less than or equal to the value to result in a match.
```
{
	<attribute> : { comparator : 'isLessThanOrEqualTo', value : <value> }
}
```

## isBetween
The compared attribute must be between the minimum and maximum values provided to result in a match. The limits provided are included in the range for the value. 

```
{
	<attribute> : { comparator : 'isBetween', value : [ <minValue>, <maxValue> ] }
}
```
