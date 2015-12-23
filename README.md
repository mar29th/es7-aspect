# ES7-Aspect

This library provides simple aspect oriented programming features in javascript using ES7 decorators.

It is a derivative of [Board](http://devpost.com/software/billboard-czkuq8) project.


## Sample Usage

In `gru-aspect.js`:
```javascript
import Aspect from 'es7-aspect';

export default class GruAspect extends Aspect {
  @Aspect.before('stealsTheMoon')
  eatsABanana(bananas) {
    if (bananas) bananas.pop();
  }

  @Aspect.intercept('stealsTheMoon')
  checkBananas(resolve, reject, bananas) {
    if (!bananas || bananas.length === 0) {
      console.log('No banana. Nah.');
      reject();
    }
    else {
      console.log(`${bananas.length} banana(s)!`);
      resolve();
    }
  }

  @Aspect.after('stealsTheMoon')
  givesBananas(bananas) {
    console.log(`${bananas.length} banana(s) left.`);
  }
}
```

In `gru.js`:
```javascript
import Aspect from 'es7-aspect';
import FooAspect from './gru-aspect';

@Aspect.use(GruAspect)
export default class Gru {
  stealsTheMoon(bananas) {
    console.log('Stole the moon!');
  }
}
```

In a console:
```javascript
new Gru().stealsTheMoon();
// Prints 'No banana. Nah.'

new Gru().stealsTheMoon(['banana', 'banana']);
// Prints
// 1 banana(s)!
// Stole the moon!
// 1 banana(s) left.
```


## Aspects
There are three aspects: Before, After and Intercept.

### Before
Perform certain activities before the original function executes. After all defined activities finishes, the original will run. _The pre-activities have access to the actual arguments that will be eventually applied._

### Intercept
The intercept aspect runs before the original function, similar to the before aspect, __except that__ there can be one and only one intercept aspect defined for a method, and it has the ability to prevent the original function from execution.

### After
Perform certain activities after the original function executes. All activities run after the original function completes execution. _The pre-activities have access to the actual arguments that will be eventually applied._
