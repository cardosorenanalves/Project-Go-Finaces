import  React  from  "react";

import {
     Container,
     Header,
     Title,
     Icon,
     Footer,
     Amount,
     LastTransaction,
     } from './styles'

     interface IProps{
        title: string;
        amount: string;
        lastTransaction: string
        type: 'up' | 'down' | 'total';
     }

export function HighlightCard({
    type,
    title, 
    amount,
    lastTransaction
} : IProps ){
    return (
        <Container>
                <Header>
                    <Title>{title}</Title>
                    <Icon name='arrow-up-circle'/>
                </Header>
                <Footer>
                    <Amount>{amount}</Amount>
                    <LastTransaction>{lastTransaction}</LastTransaction>
                </Footer>
        </Container>
    )
}