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
        import init from 'node_modules/juca/index.js'
        init()
    </script>
</body>
``` 
⚠️ THIS WILL CHANGE
<br>
<br> 

## Using Javascript direct in your HTML

You can run javascript using {{  }} in your tags:


```html
<body>

    <script>
        let title = "Important fake processor news!"
        let message = "The new processor of Kruceo Inc. Will beat the clock of 6.4 GHZ in all cores."
        let publishImg = "https://images.pexels.com/photos/40879/cpu-processor-macro-pen-40879.jpeg"
    </script>

    <h1>
        {{ title }}
    </h1>

    <p>
        {{ message }}
    </p>

    <img src="{{publishImg}}"></img>
    
    <h3>
        Date: {{ (new Date()) }}
    </h3>

    <script type="module">
        import init from 'node_modules/juca/index.js'
        init()
    </script>
</body>
``` 

# ⚠️ Warning ⚠️

Take some care with "blog like" website build, that will use pages with Juca, this can inject Javascript in page, remember to filter &lt;script> tags and use variables to inject the content in string type.

See <a>juca.blog.example.kruceo.com</a> to a simple example to inject automatic content in your blog.
