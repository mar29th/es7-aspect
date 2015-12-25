# ES7-Aspect
[![Build Status](https://travis-ci.org/lafickens/es7-aspect.svg)](https://travis-ci.org/lafickens/es7-aspect)
[![npm version](https://badge.fury.io/js/es7-aspect.svg)](https://badge.fury.io/js/es7-aspect)

This library provides simple aspect oriented programming features in javascript using ES7 decorators.

It is a derivative of [Board](http://devpost.com/software/billboard-czkuq8) project.


## Sample Usage

In `gru-aspect.js`:
```javascript
import Aspect from 'es7-aspect';

export default class GruAspect extends Aspect {
  @Aspect.before('stealsTheMoon')
  eatsABanana(bananas) {
    if (bananas) {
      console.log(`There're ${bananas.length} banana(s). Eat one.`);
      bananas.pop();
    }
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
import GruAspect from './gru-aspect';

@Aspect.use(GruAspect)
export default class Gru {
  stealsTheMoon(bananas) {
    console.log('Just stole the moon!');
  }
}
```

In a console:
```javascript
new Gru().stealsTheMoon();
// Prints 'No banana. Nah.'

new Gru().stealsTheMoon(['banana', 'banana']);
// Prints
// There're 2 banana(s). Eat one.
// Just stole the moon!
// 1 banana(s) left.
```


## Advices
There are three advices: Before, After and Intercept.

### Before
Perform certain activities before the original function executes. After all defined activities finishes, the original will run. _The pre-activities have access to the actual arguments that will be eventually applied._

### Intercept
The intercept advice runs before the original function, similar to the before advice, __except that__ there can be one and only one intercept advice defined for a method, and it has the ability to prevent the original function from execution.
* To continue running after completing the interception, call `resolve()`.
* Otherwise, to stop execution, call `reject([val])`. `[val]` is an optional argument that will be used as the return value of original function.

### After
Perform certain activities after the original function executes. All activities run after the original function completes execution. _The post-activities have access to the actual arguments that will be eventually applied._
