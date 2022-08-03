import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
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
    Transactions,
    LogoutButton
} from "./styles";

export interface DataListProps extends TransactionCardProps{
   id: string;
}

interface HighligthProps{
    amount: string;
    lastTransactions: string;
}

interface HighligthData{
    entries: HighligthProps;
    expensives: HighligthProps;
    total: HighligthProps;
}

export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<DataListProps[]>([])
    const [highlightData, setHighligthData] = useState<HighligthData>({} as HighligthData);

    function getLastTransactions(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ){
        const lastTransactions =
        Math.max.apply(Math, collection
        .filter(transactions => transactions.type === type)
        .map(transactions => new Date(transactions.date).getTime())
        )

        return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', {month: 'long' })}`;
    }

    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : []

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount)
            }else{
                expensiveTotal += Number(item.amount)
            }

           const amount = Number(item.amount)
           .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
           }) 

           const date= Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
           }).format(new Date(item.date))

           return{
            id: item.id,
            name: item.name,
            amount,
            type: item.type,
            category: item.category,
            date,
        }
        });

        setData(transactionsFormatted)
        setIsLoading(false)

        const lastTransactionsEntries = getLastTransactions(transactions, 'positive')
        const lastTransactionsExpensives = getLastTransactions(transactions, 'negative')

        const total = entriesTotal - expensiveTotal

        setHighligthData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransactions: lastTransactionsEntries
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransactions: lastTransactionsExpensives
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransactions: ''
            }
        })
        
    }

    useEffect(() => {
        loadTransactions()

    },[])

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []))
    
    return(
        <Container>
        {
           isLoading ? <ActivityIndicator color='blue'/> :
             <>
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
                    <LogoutButton onPress={()=>{ console.log('olá')}}>
                        <Icon name='power'/>
                    </LogoutButton>                   
                    </UserWrapper>
                </Header>     
            <HighlightCards >      
                <HighlightCard 
                type="up"
                title='Entradas'
                amount={highlightData?.entries?.amount}
                lastTransaction="Ultima entrada dia 17 de julho"
                />       
                <HighlightCard 
                type="down"
                title='Saídas'
                amount={highlightData?.expensives?.amount}
                lastTransaction="Ultima saída dia 03 de julho"
                />       
                <HighlightCard 
                type="total"
                title='Total'
                amount={highlightData?.total?.amount}
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
            </>}
        </Container>
    )
}
