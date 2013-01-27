# Converts an HTML form into a JavaScript object

## Configuration

```js
$.serializeObjectSetup({
  "numberForNumber":true, // decide to convert the value into number
                          // if it is a number (if !isNaN(value) -> Number(value)).

  "defaultValue":null     // The default value if the value is not set.
});
```
The default values are
```js
{
  "numberForNumber":true,
  "defaultValue":null
}
```
e.g.)
Don't convert to number and use an empty String ("") for the default value.
```js
$.serializeObjectSetup({
  "numberForNumber":false,
  "defaultValue":""
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
