import  styled, {css} from 'styled-components';
import 'react-circular-progressbar/dist/styles.css'

const dragActive = css `
  border-color: #78e5d5;
`;

const dragReject = css `
  border-color: #7d1728;
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone"
})`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: height 0.2 ease;

  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;

const messageColors = {
  default: '#999',
  error: '#7d1728',
  success: '#78e5d5'
}

export const UploadMessage = styled.p`
  display:flex;
  color: ${props => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;