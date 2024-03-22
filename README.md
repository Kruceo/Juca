# **Juca**

<div align='center'>
<img src="./icon.png" width=128px>
    <br/>
<a href="https://juca.kruceo.com">📚 <strong>Example</strong></a> |
<a href="https://home.kruceo.com">🧒🏼 <strong>Author</strong></a> |
<a href="https://home.kruceo.com/info">ℹ️ <strong>Info</strong></a>
</div>


## Introduction

Juca is a template engine, built to automate repetitive and non-intuitive processes of implementing Javascript directly in the look of your HTML.

This works on the client side, your server will send the pure html source code to the client, in the act of loading Juca, this will generate all the HTML, this works without any framework, just pure Javascript and HTML.
<br>
<br>
## Installation

```console
$ npm install kruceo/juca
```

<br>
<br>

# Getting Started

Just write a script tag in the end of your body tag:

```html
<body>
    <h1>testing</h1>
    ...

    <script type="module">
        import init from './node_modules/juca/index.js'
        init()
    </script>
</body>
``` 
⚠️ THIS WILL CHANGE
<br>
<br> 

# Instant JS in HTML

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
        import init from './node_modules/juca/index.js'
        init()
    </script>
</body>
``` 
<br>
<br> 

# Using flow control structure

## For
```html
<body>

    <script>
        let list = ["1920s","1922s","1935s","1940s"]
    </script>

    <h2 for="0;list.length;i">
        Year of {{  list[i]  }}
    </h2>


    <script type="module">
        import init from './node_modules/juca/index.js'
        init()
    </script>
</body>
``` 
<br>
<br> 

## Foreach
```html
<body>

    <script>
        let list = [{effect: 'poison',time:30},{effect: 'speed',time:120},{effect: 'regeneration',time:10}]
    </script>

    <h2 foreach="list;each">
        Potion of {{each.effect}} with {{each.time}} seconds of lifetime.
    </h2>


    <script type="module">
        import init from './node_modules/juca/index.js'
        init()
    </script>
</body>
``` 
<br>
<br> 

# Updating content

## Watch

This attribute update the content all time that the selected variable change.

```html
<body>

    <script>
        let timer = 0;
        setInterval(()=>timer++,1000)
    </script>

    <h2 watch="timer">
        You loaded this page {{timer}} seconds ago.
    </h2>


    <script type="module">
        import init from './node_modules/juca/index.js'
        init()
    </script>
</body>
``` 
<br><br>

## Conditional

```html
<body>

    <script>
        let value = 0;
        setInterval(()=>value++,1000)
    </script>
    <p>the element will show at 5.</p>

    <h2 if="value >= 5">
        {{value}}
    </h2>

    <script type="module">
        import init from './node_modules/juca/index.js'
        init()
    </script>
</body>
``` 
ℹ️ If you use the "if" attribute then you don't need to use watch to refresh content.
<br><br>

# Transporting data

## Pipe

Pipe can reference the same element that has this attribute and can run JS with its own content:

```html
<input type="text" pipe="window.myName = same.value">
```

📚 To test:

```js
setInterval(()=>{console.log(window.myName)},1000)
```
<br><br>
# ⚠️ Warning ⚠️

Take some care with "blog like" website build, that will use pages with Juca, this can inject Javascript in page, remember to filter &lt;script> tags and use variables to inject the content in string type.

See the <a href="https://juca.kruceo.com">  <strong>example</strong>  </a> to a simple example to inject automatic content in your blog. 


