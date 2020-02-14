# matchesWhereObject( object, whereQueryObject )

Determines if `object` matches `whereQueryObject`, returning `true` or `false`.

`whereQueryObject` is an object of the form:

```
{
	<attribute> : <value>
	<attribute> : [ <value>, <value> ]
	 ...
}
```

Each attribute is either a value or an array of values. If the attribute is a single value (primitive or object), object.attribute must strictly equal the value to result in a match. Otherwise, if teh attribute is is an array, only records for which object.attribute is strictly equaly to one of the elements in the array will result in a match.