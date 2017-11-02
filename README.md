# react-cent

Mail.ru Centrifuge integration component

<p align="center">
  <a href="https://www.npmjs.com/package/react-center"><img alt="npm version" src="https://img.shields.io/npm/v/react-cent.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/fortis/react-cent"><img src="https://travis-ci.org/fortis/react-cent.svg?branch=master" alt="travis-ci status"></a>
  <a href="https://coveralls.io/github/fortis/react-cent"><img src="https://coveralls.io/repos/github/fortis/react-cent/badge.svg" alt="coverage status"></a>
  <a href="https://www.npmjs.com/package/react-cent"><img src="https://img.shields.io/npm/v/react-cent.svg" alt="npm version"></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
  <a href="https://raw.githubusercontent.com/fortis/react-cent/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square"/></a>
</p>

## Installation

```sh
npm install react-cent --save
```

## Usage

Add provider:

```jsx harmony
const config = {
    url: 'http://localhost:8000/connection/websocket',
    insecure: true, // not recommended
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
        console.log('new message', message.data)
      }).history().then(history => {
        console.log('history' , history.data)
      })
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
    sockJS: SockJS,
    // ...
}
```

## Building & Testing

* source can be loaded via [npm](https://www.npmjs.com/package/react-cent), or [downloaded](https://github.com/fortis/react-cent/archive/master.zip) from github repo.
* `npm run build` to build
* `npm test` to run tests
