import React from 'react';
import styled from 'react-emotion';
import {lightGreen,lightRed,lightOrange,lightBlue,lightWhite} from '../../../constants'
const EachBox = styled('span')`
  padding: 5px;
  margin:1px;
  flex: 1;
  text-align: center;
  background: #ffffff;
  color:${props=>props.children===0 ? '#ffffff': '#000000'};
  background:${props=>{
      switch(props.children){
        case 2:
            return `${props.toAnimate ? 'rgba(255, 0, 0, 0.2)' : lightWhite};`;   
        case 4:
         return `${props.toAnimate ? 'rgba(255, 0, 0, 0.2)' : lightOrange};`;
        case 8:
         return `${props.toAnimate ? 'rgba(255, 0, 0, 0.2)' : lightGreen};`;
        case 16:
         return `${props.toAnimate ? 'rgba(255, 0, 0, 0.2)' : lightBlue};`;
        case 32:
         return `${props.toAnimate ? 'rgba(255, 0, 0, 0.2)' : lightRed};`
        default:
         return ` ${props.toAnimate ? 'rgba(255, 0, 0, 0.2)' : '#ffffff'};`
      }
  }}
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