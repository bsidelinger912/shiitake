# Shiitake

## React Line clamp that won't get you fired.

My boss once worked on an app that had a Javascript line clamp that truncated words.  Then one day the term "Cooking with Shiitake" made it into the UI and you can imagine how it got trimmed.  Trimming words is dangerous, don't risk it.  We've built a react component that handles this for you both responsively and responsibly.

### Download with NPM:

```
$ npm install --save shiitake
```
<br />

### Then you can use it like this:

```js
import Shiitake from 'shiitake';

export class App extends React.Component {
  render() {
    const text = 'Cook it up all night with Shitakes';

    return (
      <div>
        <h1>Shiitake Demo</h1>
        <Shiitake lines={2} throttleRate={200} className="my-element" tagName="p">
          {text}
        </Shiitake>
      </div>
    );
  }
}
```
<br />

### Demo:

```
$ git clone https://github.com/bsidelinger912/shiitake.git
$ cd shiitake
$ npm install && npm run dev
```

<br />

**CodePen demo**: [http://codepen.io/bsidelinger912/pen/zBgwmd](http://codepen.io/bsidelinger912/pen/zBgwmd)

<br />

### Props:

<table style="width: 100%;">
  <thead>
    <tr>
      <th>name</th>
      <th>type</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>lines</td>
      <td>Integer</td>
      <td>required - the number of lines to clamp to</td>
    </tr>
    <tr>
      <td>throttleRate</td>
      <td>Integer</td>
      <td>optional - defaults to 200, the number of milliseconds to throttle resize events to</td>
    </tr>
    <tr>
      <td>className</td>
      <td>String<np/td>
      <td>optional - a class name to pass to the returned outer element</td>
    </tr>
    <tr>
      <td>tagName</td>
      <td>String</td>
      <td>optional - defaults to 'div', the tag name for the returned outer element</td>
    </tr>
    <tr>
      <td>renderFullOnServer</td>
      <td>Boolean</td>
      <td>optional - defaults to false, this tells shiitake to render the full string on the server and in the client before it calculates the truncation.  This is useful when you have prominent text that seldom needs to be trimmed.</td>
    </tr>
    <tr>
      <td>overflowNode</td>
      <td>Node</td>
      <td>optional - defaults to '\u2026' (ellipsis), the text or html that indicates the string has been trimmed</td>
    </tr>
  </tbody>
</table>
<br />

### Events  
Event handlers for mouse events such as onClick can be passed through as props and will given to the returned outer element. Below is a list of events that are currently passed along.  We can add more easily as use cases arise. For more information about events in React, and a comprehensive list, see this [page](https://facebook.github.io/react/docs/events.html#supported-events)

### Supported events (feel free to ask for more):
* onClick
* onContextMenu
* onDoubleClick
* onDrag onDragEnd
* onDragEnter
* onDragExit
* onDragLeave
* onDragOver
* onDragStart
* onDrop
* onMouseDown
* onMouseEnter
* onMouseLeave
* onMouseMove
* onMouseOut
* onMouseOver
* onMouseUp
