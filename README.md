Tweaked jquery-serialize-object
==========
This is a tweaked version of [jquery-serialize-object](https://github.com/macek/jquery-serialize-object "jquery-serialize-object") originally written by [Paul Maček](https://github.com/macek "Paul Maček").
The main purpose for that is to make it work well with [JSON Statham](http://projects.elixirian.org/json-statham "JSON Statham"), Java / JSON Mapper library written by [myself](http://lckymn.com "Kevin's Homepage").

# Converts an HTML form into a JavaScript object

## Configuration

```js
$.serializeObjectSetup({
  "defaultValue":null,    // The default value if the value is not set.
  "defaultValues":{},     // Specifying the default values for elements with the given names.
  "numberForNumber":true, // decide to convert the value into number
                          // if it is a number (if !isNaN(value) -> Number(value)).
  "noNumbers":[]          // the elements with the names here should not be converted into numbers
                          // even if "numberForNumber is true.
});
```
The default values are
```js
{
  "defaultValue":null,
  "defaultValues":{},
  "numberForNumber":true,
  "noNumbers":[]
}
```
e.g.)
Don't convert to number and use an empty String ("") for the default value.
```js
$.serializeObjectSetup({
  "defaultValue":"",
  "numberForNumber":false
});
```
<br />
* Use an empty String ("") for the default value, yet use null for "phoneNumber".
* Convert to numbers except "phoneNumber"

```js
$.serializeObjectSetup({
  "defaultValue":"",
  "defaultValues":{"phoneNumber",null},
  "numberForNumber":false,
  "noNumbers":["phoneNumber"]
});
```
<br />
* Use an empty String ("") for the default value, yet use null for "phoneNumber" and "mobileNumber".
* Convert to numbers except "phoneNumber" and "mobileNumber"

```js
$.serializeObjectSetup({
  "defaultValue":"",
  "defaultValues":[{"name":["phoneNumber", "mobileNumber"],"defaultValue":null}],
  "numberForNumber":false,
  "noNumbers":["phoneNumber", "mobileNumber"]
});
```


## Usage
```js
$('#myForm').serializeObject();
```
OR
```
$('#myForm').serializeObject({
  // with a configuration object
});

```
```html
<form id="myForm">
  <input type="hidden" name="id" value="999" />
  <input type="text" name="name" value="Kevin" />
  <input type="text" name="email" />
</form>
```
```js
$('#myForm').serializeObject();
```
result:
```js
{"id":999,"name":"Kevin","email":null}
```
<br />
* Do not convert numbers.

```js
$.serializeObjectSetup({
  "numberForNumber":false
});

$('#myForm').serializeObject();
```
OR
```js
$('#myForm').serializeObject({
  "numberForNumber":false   // value is always String even if it's a number.
});
```
result:
```js
{"id":"999","name":"Kevin","email":null}
```
<br />
* An empty String for the default value.

```js
$.serializeObjectSetup({
  "defaultValue":""
});

$('#myForm').serializeObject();
```
OR
```js
$('#myForm').serializeObject({
  "defaultValue":""
});
```
result:
```js
{"id":999,"name":"Kevin","email":""}
```
<br />
* Do not convert numbers.
* An empty String for the default value.

```js
$.serializeObjectSetup({
  "numberForNumber":false,
  "defaultValue":""
});

$('#myForm').serializeObject();
```
OR
```js
$('#myForm').serializeObject({
  "numberForNumber":false,
  "defaultValue":""
});
```
result:
```js
{"id":"999","name":"Kevin","email":""}
```
<br />
See LICENSE
