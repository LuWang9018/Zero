import React from 'react';

//Reference
// https://formidable.com/open-source/victory/docs/victory-line

import { timeWithinRange } from '../../utils/time';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';

export class ProductStockChangeGraph extends React.Component {
  constructor(props, context) {
    super(props);
    this.store = context.store;

    var date = new Date();

    console.log(new Date(date.getFullYear(), date.getMonth(), 1));
    console.log(new Date(date.getFullYear(), date.getMonth(), 1).getTime());
    console.log(
      Math.round(new Date(date.getFullYear(), date.getMonth(), 1).getTime())
    );
    this.state = {
      data: props.data,
      timeStart: Math.round(
        new Date(date.getFullYear(), date.getMonth(), 1).getTime()
      ),
      timeEnd: Math.round(
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime()
      ),
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.store) {
      await this.setState({
        data: this.props.data,
      });
    }
  }

  extractData() {
    let usefulData = [];
    let rawData = this.state.data;
    let timeStart = this.state.timeStart;
    let timeEnd = this.state.timeEnd;

    for (let i = 0; i < rawData.length; i++) {
      if (timeWithinRange(rawData[i].quantityChangeTime, timeStart, timeEnd)) {
        usefulData.push(rawData[i]);
      }
    }
    console.log('extractData:', usefulData);
    return usefulData;
  }
  render() {
    return (
      <VictoryChart>
        <VictoryLine
          data={this.extractData()}
          x='quantityChangeTime'
          y='quantityAfterChange'
        />
      </VictoryChart>
    );
  }
}
