import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { ALERTS_ACTIONS } from 'Actions/actions';
import {
  sorts,
  isSorted,
  generateRandomArray,
  normalizeString,
  convertValuesToNumbers,
} from 'Logic';
import { DEFAULTS } from 'Store/constants';
import {
  SortingButtons,
  ArrayContainer,
  SortingOptions,
  CustomArrayOptions,
} from './SubComponents';

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

    window.vis = this;
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
    this.setState({
      cancelExecution: true,
      currentPhase,
      isSorting: false,
      nextPhases: [],
      previousPhases: [],
    });
  };

  restorePhase = () => {
    const { originalPhase } = this.state;

    if (!originalPhase.length) {
      return;
    }

    this.setState({
      currentPhase: originalPhase,
      previousPhases: [],
      nextPhases: [],
    });
  };

  handleSort = sortType => {
    const { currentPhase, isSorting } = this.state;
    const { alertSortName } = this.props;

    const originalPhase = currentPhase;

    if (isSorting) {
      this.onHandleHaltExecution();
      this.setState({ nextPhases: [] });
    }

    if (isSorted(currentPhase)) {
      return;
    }

    const convertedPhase = convertValuesToNumbers(currentPhase);
    const sort = sorts[sortType];
    const nextPhases = sort(convertedPhase);
    const sortName = normalizeString(sortType);

    alertSortName(sortName);
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
    const {
      currentPhase,
      isSorting,
      nextPhases,
      previousPhases,
      originalPhase,
    } = this.state;

    const isPhaseSorted = isSorted(currentPhase);

    const options = [
      {
        text: 'Generate New Values',
        className: 'btn-warning',
        onClick: this.generateNewPhase,
      },
      {
        text: 'Restore Values',
        className: 'btn-warning',
        onClick: this.restorePhase,
        disabled: !originalPhase.length,
      },
      {
        text: 'Go Forward',
        className: 'btn-dark',
        onClick: this.onHandleGoForwardOnePhase,
        disabled: !isSorting && !nextPhases.length,
      },
      {
        text: 'Go Back',
        className: 'btn-dark',
        onClick: this.onHandleGoBackOnePhase,
        disabled: !isSorting && !previousPhases.length,
      },
      {
        text: 'Halt Execution',
        className: 'btn-danger',
        onClick: this.onHandleHaltExecution,
        disabled: !isSorting || isPhaseSorted,
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
    const { showValues } = this.props;

    const isCorrect = isSorted(currentPhase);

    return (
      <div className="visualizer">
        <div
          className={isCorrect ? 'btn-success' : 'btn-danger'}
          style={{ width: '50px', height: '50px' }}
        >
          {isCorrect}
        </div>
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
        <ArrayContainer currentPhase={currentPhase} showValues={showValues} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { settings } = state;
  const { delay, size, showValues } = settings;

  return {
    delay,
    size,
    showValues,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    alertSortName: sortName => {
      dispatch({
        type: ALERTS_ACTIONS.ALERTS_SUCCESS,
        payload: {
          heading: 'Sorting...',
          message: `with ${sortName}`,
          variant: 'primary',
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
