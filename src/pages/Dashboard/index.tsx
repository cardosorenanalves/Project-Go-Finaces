import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { HighlightCard } from "../../components/HighlightCard";
import { LastTransaction } from "../../components/HighlightCard/styles";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionsCard";
import { useAuth } from "../../hooks/auth";


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
    LogoutButton,
    LoadContainer
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

    const theme = useTheme()
    const { signOut } = useAuth()
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<DataListProps[]>([])
    const [highlightData, setHighligthData] = useState<HighligthData>({} as HighligthData);
 


    function getLastTransactions(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ){
        const lastTransactions = new Date(
        Math.max.apply(Math, collection
        .filter(transactions => transactions.type === type)
        .map(transactions => new Date(transactions.date).getTime())
        ))
       

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
        const totalInterval = `01 a ${lastTransactionsExpensives}`

        const total = entriesTotal - expensiveTotal

        setHighligthData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransactions:`Ultima entrada dia ${lastTransactionsEntries}`
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransactions:`Ultima saída dia ${lastTransactionsExpensives}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransactions: totalInterval
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
           isLoading ?  
           <LoadContainer>
                <ActivityIndicator 
                color={theme.colors.primary}
                size='large'
                />
            </LoadContainer>:
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
                    <LogoutButton onPress={signOut}>
                        <Icon name='power'/>
                    </LogoutButton>                   
                    </UserWrapper>
                </Header>     
            <HighlightCards >      
                <HighlightCard 
                type="up"
                title='Entradas'
                amount={highlightData?.entries?.amount}
                lastTransaction={highlightData?.entries?.lastTransactions}
                />       
                <HighlightCard 
                type="down"
                title='Saídas'
                amount={highlightData?.expensives?.amount}
                lastTransaction={highlightData?.expensives?.lastTransactions}
                />       
                <HighlightCard 
                type="total"
                title='Total'
                amount={highlightData?.total?.amount}
                lastTransaction={highlightData?.total?.lastTransactions}
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
