import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionsCard";


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
    HighlightCards,
    Title,
    TransactionList,
    Transactions
} from "./styles";

export interface DataListProps extends TransactionCardProps{
   id: string;
}

export function Dashboard(){
    const data : DataListProps[]  = [{
        id: '1',
        type: 'positive',
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date: '18/07/2022',
    },
    {
        id: '2',
        type: 'negative',
        title: "Hamburgueria Pizzy",
        amount: "R$ 59,00",
        category: {
            name: 'Alimentação',
            icon: 'coffee'
        },
        date: '10/07/2022',
    },
    {
        id: '3',
        type: 'negative',
        title: "Aluguel de apartamento",
        amount: "R$ 1.200,00",
        category: {
            name: 'Casa',
            icon: 'shopping-bag'
        },
        date: '10/07/2022',
    }
]
    
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

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                data={data}
                keyExtractor={(item ) => item.id}
                renderItem={({item}) => <TransactionCard data={item}/>}
                
                />

            </Transactions>  
        </Container>
    )
}
