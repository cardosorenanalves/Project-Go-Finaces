import React from "react";
import { Control, Controller, DeepRequired, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";
import { Container, Error } from "./styles";

interface Props extends TextInputProps{
    control: Control;
    name: string;
    error?: Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>>;
}

export function InputForm({
    control,
    name,
    error,
    ...rest
}: Props ){
  return(
        <Container>
            <Controller
            control={control}
            render={({field: { onChange, value }}) => (
                <Input
                onChangeText={onChange}
                value={value}
                {...rest}
                />
            )}
            name={name}
            />
           { error && <Error>{error}</Error>}
        </Container>
  )  
}