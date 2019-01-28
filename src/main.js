import http from 'http';
import fetch from 'node-fetch';
import weblog from 'webpack-log';
import program from 'commander';
import path from 'path';

let {name, version} = require('../package.json');

let logger = weblog({name: name});

let defaultOpts = require('../seo-config.json');

let reject_service = res => {
  res.writeHead(403, {'Reason': 'This server only serve the seo-rendering proxy service'});
  res.end();
}

let proxy = ({proxyUrl, targetUrl}) => http.createServer(async (req, res) => {
  if (req.method === "GET") {
    try {
      let result = await fetch(proxyUrl + '/' + targetUrl + req.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/71.0.3578.98 Chrome/71.0.3578.98 Safari/537.36'
        }
      });
      let text = await result.text();
      res.writeHead(200, {});
      res.end(text);
      return;
    } catch(e) {
      logger.error(e);
    }
  }

  reject_service(res);
});

let launch = ({proxyUrl, targetUrl, port, host}) =>
    proxy({proxyUrl, targetUrl}).listen(port, host, () => {
      logger.info(`seo-rendering proxy launch on ${host}:${port}`);
      logger.info(`GET request will be redirect to ${proxyUrl}/${targetUrl}`);
    });

let options = {
  host: defaultOpts.host,
  port: defaultOpts.port
};

let setOpt = fieldname => (x) => options[fieldname] = x;

program
  .name(name)
  .version(version, '-v, --version')
  .option('-S, --service [proxyUrl]', 'the headless proxy service url', setOpt("proxyUrl"))
  .option('-T, --target [targetUrl]', 'the target website url', setOpt("targetUrl"))
  .option('-H, --host [host]', `default ${options.host}, hostname of this proxy server`, setOpt("host"))
  .option('-P, --port [port]', `default ${options.port}, port number of this proxy server`, setOpt("port"))
  .option('-C, --config [json filename]', 'run with config json file', filename => {
    let config = require(path.resolve(process.cwd(), filename))
    options = {...defaultOpts, ...config};
  })
  .parse(process.argv);

launch(options);
