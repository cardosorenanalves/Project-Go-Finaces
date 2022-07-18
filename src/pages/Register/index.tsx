import React from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsType
 } from "./styles";

export function Register(){
    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    
                    <Input placeholder="Nome"/>
                    <Input placeholder="Preço"/>

                    <TransactionsType>
                        <TransactionTypeButton type='up' title="Income"/>
                        <TransactionTypeButton type='down' title="Outcome"/>
                    </TransactionsType>
                  
                </Fields>
                
                <Button title="Enviar"/>
            </Form>
            
        </Container>
    );
}
