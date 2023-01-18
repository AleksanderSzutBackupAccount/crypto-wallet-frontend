import styled from 'styled-components'

interface ValidationResultParagraphProps {
    isCorrect?: boolean;
    value: boolean
}

export const StyledPinInput = styled.input<ValidationResultParagraphProps>``;


export const ValidationResultParagraph = styled.p<ValidationResultParagraphProps>`
  color: ${props => props.isCorrect ? 'green' : 'red'}
`;