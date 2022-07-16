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

export function HighlightCard(){
    return (
        <Container>
                <Header>
                    <Title>Entrada</Title>
                    <Icon name='arrow-up-circle'/>
                </Header>
                <Footer>
                    <Amount>17.400,00</Amount>
                    <LastTransaction>Ultima entrada dia 16 de julho</LastTransaction>
                </Footer>
        </Container>
    )
}