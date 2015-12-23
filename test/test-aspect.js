import Aspect from './../dist/aspect';

export default class TestAspect extends Aspect {

  @Aspect.before('testBefore')
  beforeTestBefore(lst) {
    ++lst[0];
  }

  @Aspect.after('testAfter')
  afterTestAfter(lst) {
    ++lst[0];
  }

  @Aspect.intercept('testIntercept')
  interceptTestIntercept(resolve, reject, lst) {
    if (lst[0] === 0) {
      ++lst[0];
      resolve();
    }
    else {
      lst[0] = 0;
      reject();
    }
  }

  @Aspect.before('testMixed')
  beforeTestMixed(lst) {
    lst.push('foo');
  }

  @Aspect.after('testMixed')
  afterTestMixed(lst) {
    lst.push('bar');
  }
}
