import Aspect from './../dist/aspect';
import TestAspect from './test-aspect';


@Aspect.use(TestAspect)
export default class TestClass {

  constructor() { this._count = 0; }

  testBefore(lst) { this.count++; }

  testAfter(lst) { this.count++; }

  testIntercept(lst) { this.count++; }

  testMixed() { this.count++; }
}
