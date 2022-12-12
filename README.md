# Juca

## Introduction

Juca is a template engine, built to automate repetitive and non-intuitive processes of implementing Javascript directly in the look of your HTML.

This works on the client side, your server will send the pure html source code to the client, in the act of loading Juca, this will generate all the HTML, this works without any framework, just pure Javascript and HTML.

## Installation

```console
$ npm install kruceo/juca
```


## Getting Started

Just write a script tag in the end of your body tag:

```html
<body>
    <h1>testing</h1>
    ...

    <script type="module">
        import preProcess from 'node_modules/juca/index.js'
        import posProcess from 'node_modules/juca/posprocess.js'
    </script>
</body>
``` 
⚠️ THIS WILL CHANGE
<br>
<br> 

# ⚠️ Warning ⚠️

Take some care with blog like server that will use pages with Juca, this can inject Javascript in page, remember to filter &lt;script> tags .
