import React from "react";

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWraper,
 } from "./styles";

import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-native";

export function SignIn(){
    const {GoogleSignIn} = useAuth()

   async function handleSignInWithGoogle(){
    try {
        await GoogleSignIn();
    }catch(error){
        console.log(error);
        Alert.alert('Não foi possilvel conectar a conta Google')
    }
   }
return(
    <Container>
        <Header>
            <TitleWrapper>
                <LogoSvg
                width={RFValue(120)}
                height={RFValue(68)}
                />

                <Title>
                    Controle suas {'\n'}
                    finanças de forma {'\n'}
                    muito simples
                </Title>
            </TitleWrapper>

            <SignInTitle>
                    Faça seu login com {'\n'}
                    sua conta abaixo
            </SignInTitle>
        </Header>

        <Footer>
            <FooterWraper>
                <SignInSocialButton
                title="Entrar com Google"
                svg={GoogleSvg}
                onPress={() => handleSignInWithGoogle()}
                />
            </FooterWraper>
        </Footer>

    </Container>
    )
}