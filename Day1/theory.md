What is Emmet?

A. Emmet is a built-in feature in Visual Studio Code. You don’t have to install any extensions for emmet support. Emmet prevents you from writing the entire code by yourself by providing Emmet abbreviation. Emmet is enabled by default in html, haml, pug, slim, jsx, xml, xsl, css, scss, sass, less and stylus files, and also in languages that inherits from any of the above like handlebars and PHP.

Difference between a Library and Framework?

A. The technical difference between a framework and library lies in a term called inversion of control.

When you use a library, you are in charge of the flow of the application. You are choosing when and where to call the library. When you use a framework, the framework is in charge of the flow. It provides some places for you to plug in your code, but it calls the code you plugged in as needed.

What is CDN? Why do we use it?

A. A CDN is a network of servers that distributes content from an “origin” server throughout the world by caching content close to where each end user is accessing the internet via a web-enabled device. The content they request is first stored on the origin server and is then replicated and stored elsewhere as needed. By caching content physically close to where a user is and reducing the distance it has to travel, latency is reduced. This process also decreases stress on origin servers by distributing the load geographically across multiple servers.


Why is React known as React?

A. React is called React because it was designed to be a declarative, efficient, and flexible JavaScript library for building user interfaces.

The name "React" was chosen because the library was designed to allow developers to "react" to changes in state and data within an application, and to update the user interface in a declarative and efficient manner.

What is crossorigin in script tag?

A. The crossorigin attribute sets the mode of the request to an HTTP CORS Request.

Web pages often make requests to load resources on other servers. Here is where CORS comes in.

A cross-origin request is a request for a resource (e.g. style sheets, iframes, images, fonts, or scripts) from another domain.

CORS is used to manage cross-origin requests.

CORS stands for Cross-Origin Resource Sharing, and is a mechanism that allows resources on a web page to be requested from another domain outside their own domain. It defines a way of how a browser and server can interact to determine whether it is safe to allow the cross-origin request. CORS allows servers to specify who can access the assets on the server, among many other things.

What is difference between React and ReactDOM

A. React and ReactDOM were only recently split into two different libraries.
As the name implies, ReactDOM is the glue between React and the DOM. The reason React and ReactDOM were split into two libraries was due to the arrival of React Native. React contains functionality utilised in web and mobile apps. ReactDOM functionality is utilised only in web apps.

What is difference between react.development.js and react.production.js files via CDN?

A. react.development.js file is only meant for development, and not suitable for production. Minified and optimized production versions of React are in react.production.js file.

 What is async and defer?

 A. defer: The defer attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads “in the background”, and then runs when the DOM is fully built.
 Deferred scripts keep their relative order, just like regular scripts.
    async: The async attribute is somewhat like defer. It also makes the script non-blocking. But it has important differences in the behavior.
The async attribute means that a script is completely independent:
The browser doesn’t block on async scripts (like defer).
Other scripts don’t wait for async scripts, and async scripts don’t wait for them.