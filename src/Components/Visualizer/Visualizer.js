import React, { Component } from 'react';
import _ from 'lodash';
import './Visualizer.scss';
import { sorts } from '../../Logic/sorts';
import { DEFAULTS } from '../../constants';
import {
  isAlreadySorted,
  generateRandomArray,
  nameToString,
} from '../../Logic/helpers';
import { connect } from 'react-redux';

const algorithms = _.keys(sorts);

class Visualizer extends Component {
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
      this.onHaltExecution();
      this.setState({ nextPhases: [] });
    }

    if (isAlreadySorted(currentPhase)) {
      return;
    }

    const sort = sorts[sortType];
    const nextPhases = sort([...currentPhase]);

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

    const delay = this.props;

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

  onHaltExecution = () => {
    clearTimeout(this.state.timeoutID);
    this.setState({ cancelExecution: true });
  };

  render() {
    const { currentPhase } = this.state;
    const { isValueVisible } = this.props;

    window.state = this.state;

    return (
      <div className="visualizer">
        <h1>Sorting Visualizer</h1>
        <div className="sort-options">
          <button
            type="button"
            className="btn btn-warning sort-button"
            onClick={this.generateNewPhase}
          >
            Generate New Values
          </button>
          <button
            type="button"
            className="btn btn-warning sort-button"
            onClick={this.resetPhase}
          >
            Reset Values
          </button>
          <button
            type="button"
            className="btn btn-dark sort-button"
            onClick={this.onHandleGoForwardOnePhase}
          >
            Go Forward
          </button>
          <button
            type="button"
            className="btn btn-dark sort-button"
            onClick={this.onHandleGoBackOnePhase}
          >
            Go Back
          </button>
          {_.map(algorithms, (name, index) => {
            return (
              <button
                key={index}
                type="button"
                className="btn btn-success sort-button"
                onClick={() => this.handleSort(name)}
              >
                {nameToString(name)}
              </button>
            );
          })}
          <button
            className="btn btn-danger sort-button"
            onClick={this.onHaltExecution}
          >
            Halt Execution
          </button>
        </div>
        <div className="array-container">
          {currentPhase.map((value, index) => (
            <div
              className="array-bar"
              key={index}
              style={{
                height: `${value * DEFAULTS.HEIGHT_MULTIPLIER}px`,
                width: `${DEFAULTS.WIDTH}px`,
              }}
            >
              {isValueVisible && value}
            </div>
          ))}
        </div>
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
