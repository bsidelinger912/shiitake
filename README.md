# Shiitake

## Line clamp that won't get you fired.

My boss once worked on an app that had a Javascript line clamp that truncated words.  Then one day the term "Cooking with Shiitake" made it into the UI and you can imagine how it got trimmed.  Trimming words is dangerous, don't risk it.  We've build a react component that handles this for you both responsively and responsibly.

### Download with NPM:

```
$ npm install --save shiitake
```
<br />

### Then you can use it like this:

```
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
      <td>trottleRate</td>
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
  </tbody>
</table>
