import React from 'react';
import _ from 'lodash';
import './Visualizer.scss';
import { sorts } from '../../Logic/sorts';
import { DEFAULTS } from '../../constants';
import {
  isAlreadySorted,
  generateRandomArray,
  normalizeString,
  convertValuesToNumbers,
} from '../../Logic/helpers';
import { connect } from 'react-redux';
import {
  SortingButtons,
  ArrayContainer,
  SortingOptions,
  CustomArrayOptions,
} from './SubComponents/';

const algorithms = _.keys(sorts);

class Visualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cancelExecution: false,
      isSorting: false,
      currentPhase: [],
      nextPhases: [],
      previousPhases: [],
      originalPhase: [],
      timeoutID: null,
      customPhase: '',
    };
  }

  componentDidMount() {
    this.generateNewPhase();
  }

  generateNewPhase = () => {
    const { size } = this.props;
    const currentPhase = generateRandomArray(
      size,
      DEFAULTS.INTERVAL_MIN,
      DEFAULTS.INTERVAL_MAX,
    );

    clearTimeout(this.state.timeoutID);
    this.setState({ currentPhase, cancelExecution: true });
  };

  resetPhase = () => {
    const { originalPhase } = this.state;
    this.setState({
      currentPhase: originalPhase,
      previousPhases: [],
      nextPhases: [],
    });
  };

  handleSort = sortType => {
    const { currentPhase, isSorting } = this.state;

    const originalPhase = currentPhase;

    if (isSorting) {
      this.onHandleHaltExecution();
      this.setState({ nextPhases: [] });
    }

    if (isAlreadySorted(currentPhase)) {
      return;
    }

    const convertedPhase = convertValuesToNumbers(currentPhase);
    const sort = sorts[sortType];
    const nextPhases = sort(convertedPhase);

    this.setState(
      { nextPhases, originalPhase, cancelExecution: false, isSorting: true },
      this.stepThroughPhases,
    );
  };

  stepThroughPhases = () => {
    const {
      currentPhase: oldPhase,
      nextPhases: oldNextPhases,
      previousPhases: oldPreviousPhases,
    } = this.state;

    const { delay } = this.props;

    const [currentPhase, ...nextPhases] = oldNextPhases;
    const previousPhases = [...oldPreviousPhases, oldPhase];

    this.setState(
      {
        currentPhase,
        nextPhases,
        previousPhases,
      },
      () => {
        if (this.state.nextPhases.length && !this.state.cancelExecution) {
          const timeoutID = setTimeout(this.stepThroughPhases, delay);
          this.setState({ timeoutID });
        }
      },
    );
  };

  onHandleGoForwardOnePhase = () => {
    const {
      currentPhase: oldCurrentPhase,
      nextPhases: oldNextPhases,
      previousPhases: oldPreviousPhases,
    } = this.state;

    if (!oldNextPhases.length) {
      return;
    }

    const [currentPhase, ...nextPhases] = oldNextPhases;
    const previousPhases = [...oldPreviousPhases, oldCurrentPhase];

    this.setState({
      currentPhase,
      nextPhases,
      previousPhases,
    });
  };

  onHandleGoBackOnePhase = () => {
    const {
      currentPhase: oldCurrentPhase,
      previousPhases: oldPreviousPhases,
      nextPhases: oldNextPhases,
    } = this.state;

    if (!oldPreviousPhases.length) {
      return;
    }

    const currentPhase = oldPreviousPhases.pop();
    const previousPhases = oldPreviousPhases;
    const nextPhases = [oldCurrentPhase, ...oldNextPhases];

    this.setState({ currentPhase, previousPhases, nextPhases });
  };

  onHandleHaltExecution = () => {
    clearTimeout(this.state.timeoutID);
    this.setState({ cancelExecution: true });
  };

  renderOptions = () => {
    const options = [
      {
        text: 'Generate New Values',
        className: 'btn-warning',
        onClick: this.generateNewPhase,
      },
      {
        text: 'Reset Values',
        className: 'btn-warning',
        onClick: this.resetPhase,
      },
      {
        text: 'Go Forward',
        className: 'btn-dark',
        onClick: this.onHandleGoForwardOnePhase,
      },
      {
        text: 'Go Back',
        className: 'btn-dark',
        onClick: this.onHandleGoBackOnePhase,
      },
      {
        text: 'Halt Execution',
        className: 'btn-danger',
        onClick: this.onHandleHaltExecution,
      },
    ];

    return options;
  };

  onHandleChange = e => {
    this.setState({ customPhase: e.target.value });
  };

  onHandleSubmit = event => {
    // allow [2,3,4] and 3,1,3 as valid inputs
    event.preventDefault();
    const { customPhase } = this.state;

    let values;

    try {
      values = JSON.parse(customPhase);
    } catch (e) {
      values = customPhase.split(',');
    }

    if (_.every(values, Number)) {
      this.setState({ currentPhase: values });
    }
  };

  render() {
    const { currentPhase, customPhase } = this.state;
    const { isValueVisible } = this.props;

    window.state = this.state;

    return (
      <div className="visualizer">
        <h1>Sorting Visualizer</h1>
        <CustomArrayOptions
          value={customPhase}
          onChange={this.onHandleChange}
          onSubmit={this.onHandleSubmit}
        />
        <SortingOptions options={this.renderOptions()} />
        <SortingButtons
          algorithms={algorithms}
          normalizeString={normalizeString}
          handleSort={this.handleSort}
        />
        <ArrayContainer
          currentPhase={currentPhase}
          isValueVisible={isValueVisible}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { settings } = state;
  const { delay, size, isValueVisible } = settings;

  return {
    delay,
    size,
    isValueVisible,
  };
};

export default connect(mapStateToProps)(Visualizer);
