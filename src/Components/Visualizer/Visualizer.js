import React, { Component } from 'react';
import _ from 'lodash';
import './Visualizer.scss';
import { GenerateCustomSlider } from '../CustomSlider/CustomSlider';
import { sorts } from '../../logic/algorithms';
import { DEFAULTS } from './Visualizer.constants';
import {
  isAlreadySorted,
  generateRandomArray,
  nameToString,
} from '../../logic/helpers';

const algorithms = _.keys(sorts);

class Visualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cancelExecution: false,
      delay: DEFAULTS.DELAY,
      isSorting: false,
      currentPhase: [],
      nextPhases: [],
      previousPhases: [],
      size: DEFAULTS.SIZE,
      timeoutID: null,
    };
  }

  componentDidMount() {
    this.resetPhase();
  }

  resetPhase = () => {
    const { size } = this.state;
    const currentPhase = generateRandomArray(
      size,
      DEFAULTS.INTERVAL_MIN,
      DEFAULTS.INTERVAL_MAX,
    );

    clearTimeout(this.state.timeoutID);
    this.setState({ currentPhase, cancelExecution: true });
  };

  handleSort = sortType => {
    const { currentPhase, isSorting } = this.state;

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
      { nextPhases, cancelExecution: false, isSorting: true },
      this.stepThroughPhases,
    );
  };

  stepThroughPhases = () => {
    const {
      delay,
      currentPhase: oldPhase,
      nextPhases: oldNextPhases,
      previousPhases: oldPreviousPhases,
    } = this.state;

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

  onHandleAfterChange = (attribute, value) => {
    this.setState({ [attribute]: value });
  };

  onHaltExecution = () => {
    clearTimeout(this.state.timeoutID);
    this.setState({ cancelExecution: true });
  };

  render() {
    const { currentPhase, delay, size } = this.state;

    return (
      <div className="visualizer">
        <div className="sliders">
          <GenerateCustomSlider
            attribute="delay"
            handleAfterChange={this.onHandleAfterChange}
            max={1000}
            min={5}
            text="Select sorting delay in milliseconds"
            value={delay}
          />
          <GenerateCustomSlider
            attribute="size"
            handleAfterChange={this.onHandleAfterChange}
            max={100}
            min={5}
            text="Select number of columns for next new array"
            value={size}
          />
        </div>
        <div className="sort-options">
          <button
            type="button"
            className="btn btn-warning sort-button"
            onClick={this.resetPhase}
          >
            Generate New Array
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
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default Visualizer;
