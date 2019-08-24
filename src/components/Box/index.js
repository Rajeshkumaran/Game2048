import React from 'react';
import styled from 'react-emotion';
const EachBox = styled('span')`
  border-left: 1px solid orange;
  padding: 5px;
  flex: 1;
  text-align: center;
  background: none;
  background: ${props => (props.toAnimate ? 'rgba(255, 0, 0, 0.2)' : 'none')};
  transition: background 0.2s ease-in-out;
`;
export default class Box extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: props.value,
        toAnimate: false,
      };
    }
    static getDerivedStateFromProps(props, state) {
      if (props.value !== state.value) {
        if (props.value !== 0)
          return { ...state, value: props.value, toAnimate: true };
        else return { ...state, value: props.value, toAnimate: false };
      }
  
      return { ...state, toAnimate: false };
    }
    componentDidUpdate(prevProps, prevState) {
      if (!prevState.toAnimate && prevState.toAnimate !== this.state.toAnimate) {
        setTimeout(() => {
          this.setState({
            toAnimate: false,
          });
        }, 200);
      }
    }
    render() {
      const { value, toAnimate } = this.state;
      return <EachBox toAnimate={toAnimate}>{value}</EachBox>;
    }
  }