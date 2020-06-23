# react-snackbar-g
[![npm version](https://badge.fury.io/js/react-snackbar-g.svg)](https://badge.fury.io/js/react-snackbar-g)
[![build status](https://img.shields.io/travis/axios/axios/master.svg?style=flat-square)](https://travis-ci.org/Shrroy/react-snackbar-g)
[![Coverage Status](https://coveralls.io/repos/github/Shrroy/react-snackbar-g/badge.svg?branch=master)](https://coveralls.io/github/Shrroy/react-snackbar-g?branch=master)



Provide brief messages about app processes. The component known as a Snackbar and toast.

<p align="center"> 
<img height="110" src="https://media.giphy.com/media/Sthwoxc1pHj9lTCkA8/giphy.gif">
<img height="110" src="https://media.giphy.com/media/kfXhgby3ygKHjVdRV0/giphy.gif">
</p>

## Description 

`react-snackbar-g` inform users of a process that an app has performed or will perform. They appear temporarily, towards the bottom of the screen. They shouldn’t interrupt the user experience, and it doesn’t require user input to disappear.

`react-snackbar-g` contains two lines of text `title, message` and `type` directly related to the operation performed.

## Demo
See how does it work <a target='_black'  rel="noopener noreferrer" href='https://shrroy.github.io/react-snackbar-g'>Live Demo</a>


## Installation 

```sh
$ npm install react-snackbar-g --save
```

## Usage
```js
import React from 'react'; //ES6
import Snackbar from "react-snackbar-g";

export default class App extends React.Component {
    state = {
        isOpen: false,
        snackbar: { type: 'error',title: '',message: '',qbs: null },
    }
    showHide = () =>{
        this.setState({
            isOpen: true,
            snackbar: {
                title: 'Wrong credentials',
                message: 'The credentials you supplied were not correct', // pass it empty string will show title only
                type: 'error',
                qbs: Math.random(), // important to set random number every time you want to update or show
            }
        })
    }
    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.isOpen} 
                    onClose={()=>this.setState({isOpen: false})} 
                    type={this.state.snackbar.type} // 'process' 'success' 'error'
                    title={this.state.snackbar.title} 
                    message={this.state.snackbar.message} // pass it empty string will show title only
                    qbs={this.state.snackbar.qbs}
                />
                <button onClick={this.showHide}>Show And Hide Automatically</button>
            </div>
        );
    }
}
```

#### Props

| name       | type    | required | example | description |
| ---------- | ------- | -------- | ------- | ----------- |
| open | boolean | yes | `false` | Enable or Disable the snackbar |
| onClose | fun | yes | `fun()` | Callback function called on close snackbar |
| type | string | yes | `process` | consists of three variants `process`, `success`, `error` |
| title | string | yes | `'Title here'` | The title of snackbar |
| qbs | number | yes | `Math.random()` | qbs should be different ever time you update snackbar or show, hide  |
| message | string | no | `'Message here'` | Pass empty string will show title only |
| hide | boolean | no | `true` | set hide to `false` if you want to keep snackbar appear |
| duration | number | no | `4000` | how long (in ms) duration of snackbar |
| iconColor | string | no | `'#8bc34a'` | change icon color to all types |
| titleStyle | object | no | `{color: '#fff'}` | Change title inline style |
| msgStyle | object | no | `{color: '#fff'}` | Change message inline style |
| style | object | no | `{background: '#2d3242'}` | icon container inline style |
| className | string | no | `'iconContainer'` | icon container class style |
| contentStyle | object | no | `{background: '#1e232f',}` | content title,message inline style |
| contentClass | string | no | `'contentStyle'` | content title,message class style |

###Frequency
Only one snackbar may be displayed at a time.

## Recommended Usage with `react-router-dom`
```js
import React, { Component } from 'react';
import { Route,Router } from 'react-router-dom';
import Snackbar from "react-snackbar-g";

export class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            snackbar: { type: 'process',title: 'Loading',message: '',qbs: null },
        };
    }
    updateSnack = (snackbar) =>{
        this.setState(snackbar)
    }
    render() {
        return (
        <Router>
            <Route path='/' render={()=><Home updateSnack={this.updateSnack} />} />
            <Route path='/users' render={()=><Users updateSnack={this.updateSnack}  />}  />

            <Snackbar
                open={this.state.isOpen}
                onClose={()=>this.setState({isOpen: false})}
                type={this.state.snackbar.type}
                title={this.state.snackbar.title}
                message={this.state.snackbar.message}
                qbs={this.state.snackbar.qbs}
            />
         </Router>
        );
    }
}
```
`Usage` in child components
```js
    <button onClick={()=>this.props.updateSnack({
    isOpen:true,
    snackbar: { 
         title: 'Wrong credentials',
         message: 'The credentials you supplied were not correct',
         type: 'error', qbs: Math.random()} })}>Call from child</button>
```

## Custom style usage
```js
    state = {
        isOpen: false,
        snackbar: { type: 'process',title: '',message: '',qbs: Math.random() },
    }

    <Snakbar
         open={this.state.isOpen}  // *(Required)
         onClose={()=>this.setState({isOpen: false})}  // *(Required)
         type={this.state.snackbar.type} // *(Required)
         qbs={this.state.snackbar.qbs} // *(Required)
         title={this.state.snackbar.title}  // *(Required)

         message={this.state.snackbar.message} // (optional)
         hide={this.state.snackbar.hide} // (optional)
         duration={4000} // (optional) default 4000
         iconColor={'#8bc34a'} // (optional)
         titleStyle={{color: '#fff'}} // (optional) title inline style
         msgStyle={{color: '#fff'}} // (optional) message inline style

         style={{background: '#2d3242'}} // (optional) icon container style
         className={'iconContainer'} // (optional) icon container class style
         contentStyle={{background: '#1e232f',}} // (optional) content title,message inline style
         contentClass={'contentStyle'} // (optional) content title,message class style
    />
```

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |



###License
MIT License

Copyright (c) 2020 Liam & Adam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
