import React from 'react';
import ReactDOM from 'react-dom';
import merge from 'amp-merge';

function generateDummyTest() {
  var delay = 7000 + Math.random() * 7000;
  var testPassed = Math.random() > 0.5;

  return function(callback) {
    setTimeout(function() {
      callback(testPassed);
    }, delay);
  };
}

var tests = [
  { description: "commas are rotated properly",          run: generateDummyTest() },
  { description: "exclamation points stand up straight", run: generateDummyTest() },
  { description: "run-on sentences don't run forever",   run: generateDummyTest() },
  { description: "question marks curl down, not up",     run: generateDummyTest() },
  { description: "semicolons are adequately waterproof", run: generateDummyTest() },
  { description: "capital letters can do yoga",          run: generateDummyTest() }
];

var TestRunnerContainer = React.createClass({

  getInitialState() {
    let testCases = this.props.tests.map((test) => {
      //quick clone, probably would use something else, but time
      let test_copy = merge(test);
      test_copy.status = 'not started';
      test_copy.passed = undefined;
      return test_copy;
    });
    return {
      number_of_tests: this.props.tests.length,
      number_of_tests_passed: 0,
      number_of_tests_failed: 0,
      tests_run: 0,
      tests_state: testCases
    };
  },

  componentDidMount() {
    let new_state = this.state.tests_state.map((test, i) => {
      let test_copy = merge(test);
      test_copy.status = 'started';
      test_copy.run((passed) => {
        this.testResult(passed, i);
      });
      return test_copy;
    });
    this.setState({
      tests_state: new_state
    });
  },

  testResult(passed, result_test_item){
    let new_state = this.state.tests_state.map((test, test_item) => {
      let test_copy = merge(test);
      if (result_test_item === test_item) {
        test_copy.status = 'finished';
        test_copy.passed = passed;
        let number_of_tests_passed = passed ? this.state.number_of_tests_passed+=1 : this.state.number_of_tests_passed;
        let number_of_tests_failed = passed ? this.state.number_of_tests_failed : this.state.number_of_tests_failed+=1;
        this.setState({
          number_of_tests_passed: number_of_tests_passed,
          number_of_tests_failed: number_of_tests_failed,
          tests_run: this.state.tests_run+=1
        });
      }
      return test_copy;
    });
    this.setState({
      tests_state: new_state
    });
  },

  render(){
    let testList = this.state.tests_state.map((test, i) => {
      var status = 'still checking';
      var background_color = '#fff';
      if (test.status === 'finished'){
        status = test.passed ? 'it passed!' : 'did not pass :(';
        background_color = test.passed ? '#9CFF9C' : '#FFABAB';
      }
      return <div key={i} style={{background: background_color}}>
        <span>test: {test.description}----------</span>
        <span style={{color: 'blue'}}>status: {test.status}----------</span>
        <span style={{color: 'purple'}}> passed: {status}</span>
      </div>;
    });
    let statusList = this.state.tests_state.map((test, i) => {
      var color = '#C9DC5F';
      if (test.status === 'finished'){
        color = test.passed ? '#9CFF9C' : '#FFABAB';
      }
      return (
        <li key={'status'+i} style={{color: color}}>|||</li>
      );
    });
    return (
      <div>
        <ul>
          {statusList}
        </ul>
        <h1>Test runner!</h1>
        {testList}
        <p>Tests {this.state.number_of_tests}</p>
        <p>Tests passed {this.state.number_of_tests_passed}</p>
        <p>Tests failed {this.state.number_of_tests_failed}</p>
        {this.state.tests_run === this.state.number_of_tests ? <p>FINISHED!</p> : ''}
      </div>
    );
  }
});

ReactDOM.render(<TestRunnerContainer tests={tests} />, document.getElementById('test-runner'));
