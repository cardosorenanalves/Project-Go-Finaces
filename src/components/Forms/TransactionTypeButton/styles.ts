import styled, { css } from 'styled-components/native';
import { RectButton } from "react-native-gesture-handler";
import {Feather} from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

interface IconsProps{
    type: 'up' | 'down';
}

interface ContainerProps{
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({isActive}) => isActive ? 0 : 1.5};
  border-style: solid; 
  border-color: ${({theme}) => theme.colors.text};
  border-radius: 5px;
  padding: 16px;

  ${({isActive, type}) => isActive && type === 'up' && css`
    background-color: ${({theme}) => theme.colors.success_ligth}
  `}

  ${({isActive, type}) => isActive && type === 'down' && css`
    background-color: ${({theme})=> theme.colors.attention_ligth};
  `}

 
`;

export const Button = styled.TouchableOpacity<ContainerProps>`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`;

export const Icon = styled(Feather)<IconsProps>`
font-size: ${RFValue(24)}px;
margin-right: 12px;

color: ${({theme, type}) => type === 'up' ? theme.colors.success : theme.colors.attention}

`;

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(14)}px;

`;
