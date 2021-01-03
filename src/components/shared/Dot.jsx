import styled from 'styled-components';

const Dot = styled.div`
  width: ${(props) => props.size || '10px'};
  height: ${(props) => props.size || '10px'};
  border-radius: 50%;
  background: ${(props) => props.color};
`;

export default Dot;
