import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { addMonths, subMonths, format } from 'date-fns'
import {ptBR} from 'date-fns/locale'

import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import { Container, Header, Title, ChartContainer, MonthSelect,
     MonthSelectButton, SelectIcon, Month, LoadContainer } from "./styles";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export interface TransactionData{
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData{
   key: string;
   name: string;
   totalFormatted: string; 
   total: number; 
   color: string;
   percent: string;
}
export function Resume(){
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme()

    function handleChangeDate(action: 'next' | 'prev'){
        
        if(action == 'next'){
           
           setSelectedDate(addMonths(selectedDate, 1))
        }else{
            setSelectedDate(subMonths(selectedDate, 1))
        }
    }

    async function loadData(){
        setIsLoading(true)
       const dataKey = '@gofinances:transactions';
       const data = await AsyncStorage.getItem(dataKey) 
       const dataFormatted = data ? JSON.parse(data) : []    

       const expensives = dataFormatted
       .filter((expensive: TransactionData )=> expensive.type === 'negative' &&
       new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
       new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
       );

       const expensivesTotal = expensives
       .reduce((acumulator : number, expensive: TransactionData) => {
            return acumulator + Number(expensive.amount)
       }, 0)

       const totalByCategory: CategoryData[] = [];

      categories.forEach(category => {
        let categorySum = 0;

        expensives.forEach((expensive: TransactionData) => {
            if(expensive.category == category.key){
                categorySum += Number(expensive.amount)
            }
        });

        if(categorySum > 0){
            const total = categorySum
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

            totalByCategory.push({
                key: category.key,
                name: category.name,
                color: category.color,
                total: categorySum,
                totalFormatted: total,
                percent
                
            })
        }
      })
      setTotalByCategories(totalByCategory)
      setIsLoading(false)
    }



    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]))

    return(
        <Container>
           
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            {
            isLoading ?
            <LoadContainer>
                <ActivityIndicator 
                color={theme.colors.primary}
                size='large'
                />
            </LoadContainer> :
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 24,
                paddingBottom: useBottomTabBarHeight(),      
            }}
            >        

                <MonthSelect>
                    <MonthSelectButton onPress={()=> handleChangeDate('prev')}>
                        <SelectIcon name="chevron-left"/>
                    </MonthSelectButton>

                        <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

                    <MonthSelectButton onPress={()=> handleChangeDate('next')}>
                        <SelectIcon name="chevron-right"/>
                    </MonthSelectButton>
                </MonthSelect>

                <ChartContainer>
                    <VictoryPie
                    data={totalByCategories}
                    colorScale={totalByCategories.map(category => category.color)}
                    style={{
                        labels: {
                            fontSize: RFValue(18),
                            fontWeight: 'bold',
                            fill: theme.colors.shape
                        } 
                    }}
                    labelRadius={50}
                    x='percent'
                    y='total'
                    />
                </ChartContainer>
           

                    {
                    totalByCategories.map(item => (
                    <HistoryCard
                    key={item.key}
                    title={item.name}
                    amount={item.totalFormatted}
                    color={item.color}
                    />
                    )) }
                
            </ScrollView>
}
        </Container>
    )
}