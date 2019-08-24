import React from 'react';
import styled from 'react-emotion';
const ControlsWrap = styled('div')`
  padding: 10px;
  display: flex;
  flex-direction:column;
  max-width:300px;
`;
const Button = styled('button')`
  border-radius:5px;
  padding:10px;
  width:40px;
  background:#51F53B;
  margin:5px;
  outline:none;
`;
const Arrow = styled("span")`
border: 1px solid #000;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
`
const LeftArrow = styled(Arrow)`
transform: rotate(135deg);
`;
const RightArrow = styled(Arrow)`
transform: rotate(-45deg);
`;
const UpArrow = styled(Arrow)`
transform: rotate(-135deg);
`;
const DownArrow = styled(Arrow)`
transform: rotate(45deg);
`
const RowWrap = styled("div")`
display:flex;
justify-content:center;
`
 const  Controls =(props)=>{
        const {moveDown,moveLeft,moveRight,moveUp} = props;
        return <ControlsWrap>
            <RowWrap>
                <Button onClick={moveUp}><UpArrow/></Button>
            </RowWrap>
            <RowWrap>
                <Button onClick={moveLeft}> <LeftArrow/> </Button>
                <Button onClick={moveRight}> <RightArrow/> </Button>
            </RowWrap>
            <RowWrap>
                <Button onClick={moveDown}><DownArrow/></Button>
            </RowWrap>
        </ControlsWrap>
    }
export default Controls;