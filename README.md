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
    const text = 'Cooking with Shitakes';

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

## ** NOTE: Shiitake version three is now out! **
The primary change with v3 is that we drop support for React versions lower than 16.8.  This allows Shiitake to 
be written with hooks.  In the re-write I was able to fix several bugs that were hard to deal identify and reason about in a Class Component.  I was also able to make some performance improvements, specifically around resize handling and a better debouncing hook.  These things could have been done without hooks, but I find hooks make it easy to reason about things and identify opportunities for improvements and flawed logic.

The other big difference is the new "attributes" prop.  This allows you to pass any valid JSX attributes (props) into the outer rendered element.  This is the same element that is defined by the "tagName" prop.  This way you can have more control over the rendered result.  We also added classes for some of the inner spans which you can target in css for further control.  In this change we dropped support for passing event handlers like "onClick" at the top level Shiitake props, but you can pass them now in attributes.  This means any event supported by the tagName of your choice is now supported in addition to other attributes like "title", "href" etc.  The top level "className" prop is deprecated in favor of passing className inside of "attributes", but is still supported until the next major version when it will be removed.  

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
      <td>attributes</td>
      <td>Object</td>
      <td>optional - allows you to pass HTMLAttributes to the rendered outer element.  You can pass valid attributes for any whitelisted react element (see tagName property).  In Typescript the type is a union of the HTMLAttributes for each whitelisted element type or tagName.</td>
    </tr>
    <tr>
      <td>className</td>
      <td>String<np/td>
      <td>*NOTE* this is supported for now but is deprecated in favor of the attributes prop (which allows you to pass className and much more)</td>
    </tr>
    <tr>
      <td>tagName</td>
      <td>String</td>
      <td>optional - defaults to 'div', the tag name for the returned outer element.  The valid options are: 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span' and 'a'.</td>
    </tr>
    <tr>
      <td>overflowNode</td>
      <td>Node</td>
      <td>optional - defaults to '\u2026' (ellipsis), the text or html that indicates the string has been trimmed</td>
    </tr>
    <tr>
      <td>onTruncationChange</td>
      <td>Function (isTruncated: boolean) => void</td>
      <td>optional - This is called whenever the text gets trimmed or stops being trimmed.  Its useful for setting state based on whether the text has been truncated or not</td>
    </tr>
  </tbody>
</table>
<br />

### Events  
Event handlers for mouse events such as onClick can be passed through the attributes prop, which will forward all props to the rendered outermost JSX element. For more information about events in React, and a comprehensive list, see this [page](https://facebook.github.io/react/docs/events.html#supported-events)
