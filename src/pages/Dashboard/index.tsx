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
    Icon
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

                <HighlightCard/>       
        </Container>
    )
}
