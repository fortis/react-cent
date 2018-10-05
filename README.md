# react-cent

Mail.ru Centrifuge integration component

<p align="center">
  <a href="https://www.npmjs.com/package/react-cent"><img alt="npm version" src="https://img.shields.io/npm/v/react-cent.svg?style=flat-square"></a>
  <a href="https://scrutinizer-ci.com/g/fortis/react-cent"><img alt="Scrutinizer Code Quality" src="https://scrutinizer-ci.com/g/fortis/react-cent/badges/quality-score.png?b=master"/></a>
<a href="https://app.fossa.io/projects/git%2Bgithub.com%2Ffortis%2Freact-cent?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Ffortis%2Freact-cent.svg?type=shield"/></a>
  <a href="https://travis-ci.org/fortis/react-cent"><img src="https://travis-ci.org/fortis/react-cent.svg?branch=master" alt="travis-ci status"></a>
  <a href="https://coveralls.io/github/fortis/react-cent"><img src="https://coveralls.io/repos/github/fortis/react-cent/badge.svg" alt="coverage status"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
  <a href="https://raw.githubusercontent.com/fortis/react-cent/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square"/></a>
</p>


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ffortis%2Freact-cent.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Ffortis%2Freact-cent?ref=badge_large)

## Prerequisites

Firstly you should run Centrifugo server.

Start it with [Docker image](https://docker.com)
```jsx harm
 docker run --ulimit nofile=65536:65536 -p 8000:8000 centrifugo/centrifugo centrifugo --admin --web --insecure_admin
```
`--admin --web --insecure_admin` - used for development purposes to enable admin interface and skip password prompt.

Open [http://localhost:8000](http://localhost:8000)
![](https://pp.userapi.com/c841329/v841329697/36aaa/B7-bq-u3Fyw.jpg)

For alternative installation methods and production usage see: [Install Centrifugo and quick start](https://fzambia.gitbooks.io/centrifugal/content/server/start.html). 

## Installation

To get the latest version, simply install the package using npm:
```sh
npm install react-cent --save
```

## Usage

You can disable token authentication with `insecure: true` parameter, but this mode is mostly for personal and demonstration uses.

All configuration parameters are described in centrifuge-js [documentation](https://fzambia.gitbooks.io/centrifugal/content/clients/javascript.html#configuration-parameters)

Add provider:

```jsx harmony

const config = {
    url: 'http://localhost:8000/connection/websocket',
    insecure: true, // disable token auth
    // user: 'USER ID',
    // timestamp: 'UNIX TIMESTAMP',
    // token: 'TOKEN',
}

ReactDOM.render(
    <Provider store={store}>
      <CentProvider config={config}>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </CentProvider>
    </Provider>,
    document.getElementById('app')
)
```

Handle messages:

```jsx harmony
import React from 'react'
import { cent } from 'react-cent'

// Make Centrifuge client accessible through `this.props.cent`
@cent 
export class SiteMetrics extends React.Component {
    constructor (props) {
      super(props)

      // Subscribe on `site-metrics` channel.
      this.props.cent.subscribe('site-metrics', message => {
        this.handleMessage(message)
      }).history().then(history => {
        this.handleHistory(history)
      })
    }
    
    handleMessage(message) {
      console.log('message', message.data)
    }
    
    handleHistory(history) {
      console.log('history' , history.data)
    }
}
```

## SockJS (optional)

Install package
```npm
npm install sockjs-client --save
```

Update provider configuration
```jsx harmony
import SockJS from 'sockjs-client'

const config = {
    // Change connection url.
    url: 'http://localhost:8000/connection',
    // Add SockJS client option.  
    sockJS: SockJS
}
```

### Documentation
* [Javascript browser client](https://fzambia.gitbooks.io/centrifugal/content/clients/javascript.html)
* [Configuration parameters](https://fzambia.gitbooks.io/centrifugal/content/clients/javascript.html#configuration-parameters)
* [Subscriptions](https://fzambia.gitbooks.io/centrifugal/content/clients/javascript.html#subscriptions)
* [SockJS](https://fzambia.gitbooks.io/centrifugal/content/clients/javascript.html#sockjs)

## Built With

* [CentrifugeJS](https://github.com/centrifugal/centrifuge-js) - Javascript client to communicate with Centrifugo from web browser over Websockets or SockJS
* [React](https://github.com/facebook/react) - A declarative, efficient, and flexible JavaScript library for building user interfaces.

## Building & Testing

*  source can be loaded via [npm](https://www.npmjs.com/package/react-cent), or [downloaded](https://github.com/fortis/react-cent/archive/master.zip) from github repo.
* `npm run build` to build
* `npm test` to run tests

## License

`react-cent` is licensed under [The MIT License (MIT)](LICENSE).