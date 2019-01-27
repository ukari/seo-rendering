# seo-rendering

## Install
``` shell
npm install -g seo-rendering
```

## Usage
Usage: seo-rendering [options]

### options
- v, --version                 output the version number
- S, --service [proxyUrl]      the headless proxy service url
- T, --target [targetUrl]      the target website url
- H, --host [host]             default 127.0.0.1, hostname of this proxy server
- P, --port [port]             default 8081, port number of this proxy server
- C, --config [json filename]  run with config json file
- h, --help                    output usage information

## Start server
Start the server, and then access the `http://<host>:<port>/<your sub path>`in the browser.

### with CLI params
``` bash
seo-rendering -S <your.headless.render.service.url> -P <port> -T <your.target.website.url> -H <host>
```

QA: What is a [`headless render service`](https://github.com/GoogleChrome/rendertron#render)?

### with config file
``` bash
seo-rendering -C seo-config.json
```

a [template config file](https://github.com/ukari/seo-rendering/blob/master/seo-config.json) for reference
