import Aspect from './../dist/aspect';
import TestAspect from './test-aspect';


@Aspect.use(TestAspect)
export default class TestClass {

  testBefore(lst) {}

  testAfter(lst) {}

  testIntercept(lst) {}

  testMixed() {}
}
