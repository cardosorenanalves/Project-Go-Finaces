import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Input } from "../../components/Forms/Input";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { CategorySelect } from "../CategorySelect";
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType
 } from "./styles";
  
 interface FormData{
     [name: number]: string;
     [amount: string]: any;
 }

 
export function Register(){
    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    })

    const {
    control,
    handleSubmit,
    } = useForm({
    });

    function handleTransactionsTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleCloseSelectCategory(){
        setCategoryModalOpen(false)
    }

    function handleOpenSelectCategory(){
        setCategoryModalOpen(true)
    }

    function handleRegister(form: FormData){

        if(form.name == undefined || form.name == ''){
            return Alert.alert('Nome é um valor obrigatorio')
        }

        if(form.amount == ''){
            return Alert.alert('Preço é um valor obrigatorio')
        }

        if(isNaN(form.amount) == true ){
            return Alert.alert('Insira um valor númerico')
        }

        if(!transactionType){
            return Alert.alert('Selecione o tipo da transação')
        }

        if(category.key === 'category'){
            return Alert.alert('Selecione a categoria') 
            
        }

        
        const data = {
            name: form.name,
            amount: Number(form.amount) ,
            transactionType,
            category: category.key
        }

        console.log(data)
    }

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
                     />

                    <InputForm
                    name="amount" 
                    control={control}
                    placeholder="Preço"
                    keyboardType="numeric"
                    />

                    <TransactionsType>
                        <TransactionTypeButton 
                        type='up' 
                        title="Income"
                        onPress={() => handleTransactionsTypeSelect('up')}
                        isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                        type='down' 
                        title="Outcome"
                        onPress={() => handleTransactionsTypeSelect('down')}
                        isActive={transactionType === 'down'}
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

            <Modal visible={categoryModalOpen}>
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
