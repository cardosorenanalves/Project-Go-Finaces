import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";

import * as Yup from 'yup';
import uuid from 'react-native-uuid'
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Input } from "../../components/Forms/Input";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";


import { CategorySelect } from "../CategorySelect";
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType
 } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
  
 interface FormData{
    [key: string]: any;
 }

 type NavigationProps = {
    navigate:(screen:string) => void;
 }
 

 const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor númerico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
 }).required();

 
export function Register(){
    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    })

    const navigation = useNavigation<NavigationProps>();
    const dataKey = '@gofinances:transactions';

    const {
    control,
    handleSubmit,
    reset,
    formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionsTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type);
    }

    function handleCloseSelectCategory(){
        setCategoryModalOpen(false)
    }

    function handleOpenSelectCategory(){
        setCategoryModalOpen(true)
    }


 async function handleRegister(form: FormData){


        if(!transactionType){
            return Alert.alert('Selecione o tipo da transação')
        }

        if(category.key === 'category'){
            return Alert.alert('Selecione a categoria') 
            
        }

        
        const newTransactions = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
        const data = await AsyncStorage.getItem(dataKey);
        const currentData = data ? JSON.parse(data) : [];
        const dataFormated = [
            ...currentData,
            newTransactions
        ]

        const dataString = JSON.stringify(dataFormated)
         console.log(dataFormated)
        await AsyncStorage.setItem(dataKey, dataString);

        reset();
        setTransactionType('');
        setCategory({
            key: 'category',
            name: 'Categoria'
        });

        navigation.navigate('Listagem')
        } catch(error) {
        console.log(error)
        Alert.alert('Não foi possivel salvar')
        }
    }

    // useEffect(() => {
    //  async function loadData(){
    // const data = await AsyncStorage.getItem(dataKey);
    // console.log(JSON.parse(data!))
    //  }  

    //  loadData()
    // },[])

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    
                    <InputForm
                     name='name'
                     control={control}
                     placeholder="Nome"
                     autoCapitalize="sentences"
                     autoCorrect={false}
                     error={errors.name && errors.name.message}
                     />

                    <InputForm
                    name="amount" 
                    control={control}
                    placeholder="Preço"
                    keyboardType="numeric"
                    error={errors.amount && errors.amount.message}
                    />

                    <TransactionsType>
                        <TransactionTypeButton 
                        type='up' 
                        title="Income"
                        onPress={() => handleTransactionsTypeSelect('positive')}
                        isActive={transactionType === 'positive'}
                        />
                        <TransactionTypeButton 
                        type='down' 
                        title="Outcome"
                        onPress={() => handleTransactionsTypeSelect('negative')}
                        isActive={transactionType === 'negative'}
                        />
                    </TransactionsType>

                    <CategorySelectButton 
                    title={category.name}
                    onPress={handleOpenSelectCategory}
                    />
                  
                </Fields>
                
                <Button 
                title="Enviar"
                onPress={handleSubmit(handleRegister)}
                />
            </Form>

            <Modal 
            visible={categoryModalOpen}
            animationType='slide'
            >
                <CategorySelect
                category={category}
                setCategory={setCategory}
                closeSelectCategory={handleCloseSelectCategory}
                />
            </Modal>
            
        </Container>
        </TouchableWithoutFeedback>
    );

    }
