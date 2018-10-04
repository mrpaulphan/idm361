`<meta name="apple-mobile-web-app-capable" content="yes">`

Sets whether a web application runs in full-screen mode.
[Reference](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)

`<meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width, maximum-scale=1.0">`

`width=device-width`

This means, we are telling to the browser “my website adapts to your device width”.

`initial-scale`

This defines the scale of the website, This parameter sets the initial zoom level, which means 1 CSS pixel is equal to 1 viewport pixel. This parameter help when you're changing orientation, or preventing default zooming. Without this parameter, responsive site won't work.

`maximum-scale`

Maximum-scale defines the maximum zoom. When you access the website, top priority is maximum-scale=1, and it won’t allow the user to zoom.

`minimum-scale`

Minimum-scale defines the minimum zoom. This works the same as above, but it defines the minimum scale. This is useful, when maximum-scale is large, and you want to set minimum-scale.

`user-scalable`

User-scalable assigned to 1.0 means the website is allowing the user to zoom in or zoom out.

But if you assign it to `user-scalable=no`, it means the website is not allowing the user to zoom in or zoom out.
