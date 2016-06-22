# Shiitake

## Line clamp that won't get you fired.

My boss once worked on an app that had a Javascript line clamp that truncated words.  Then one day the term "Cooking with Shiitake" made it into the UI and you can imagine how it got trimmed.  Trimming words is dangerous, don't risk it.  We've build a react component that handles this for you both responsively and responsibly.

Download with NPM:

```
$ npm install --save shiitake
```

Then you can use it like this:

```
import Shiitake from 'shiitake';

export class App extends React.Component {
  render() {
    const text = 'Cook it up all night with Shitakes';

    return (
      <div>
        <h1>Shiitake Demo</h1>
        <Shiitake lines="2" throttleRate={200} className="shiitake">
          {text}
        </Shiitake>
      </div>
    );
  }
}
```
