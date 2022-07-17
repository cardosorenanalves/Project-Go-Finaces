import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { HighlightCard } from "../../components/HighlightCard";


import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,  
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards
} from "./styles";

export function Dashboard(){
    return(
        <Container>
                <Header>
                    <UserWrapper>
                    <UserInfo>
                            <Photo 
                            source={{uri: 'https://avatars.githubusercontent.com/u/92605591?v=4'}}
                            />
                            <User>
                                    <UserGreeting>Olá,</UserGreeting>
                                    <UserName>Renan</UserName>
                            </User>
                    </UserInfo>
                        <Icon name='power'/>
                    </UserWrapper>
                </Header>     
            <HighlightCards >      
                <HighlightCard 
                type="up"
                title='Entradas'
                amount="R$ 17.400,00"
                lastTransaction="Ultima entrada dia 17 de julho"
                />       
                <HighlightCard 
                type="down"
                title='Saídas'
                amount="R$ 1.259,00"
                lastTransaction="Ultima saída dia 03 de julho"
                />       
                <HighlightCard 
                type="total"
                title='Total'
                amount="R$ 16.141,00"
                lastTransaction="01 à  18 de julho"
                />       
                
            </HighlightCards>      
        </Container>
    )
}
