ORCID.js
========

##Client Side ORCID Generator

This library creates a simple way to include ORCID profile information. It (currently) works using the javascript fetch() method.

##Hello World Example

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>ORCID DEMO</title>
    <script src="orcid.js"></script>
</head>

<body>
    <div id="myPublications"></div>
</body>

<script>
    createORCIDProfile("0000-0002-9563-0691","myPublications");
</script>

</html>
```

##Compatibility

There are some <a href="http://caniuse.com/#feat=fetch">compatibility issues</a> with using this library as it relies on fetch() instead of XMLHttpRequest.

##Licence
* This is made available and licensed under the MIT License:
 * https://opensource.org/licenses/mit-license.html