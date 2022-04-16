import React from 'react'
import {
    Box,
    Flex,
    Image
} from "@chakra-ui/react";
import Logo from "../../assets/logo.svg";
import PrimaryButton from '../PrimaryButton';

function Navbar({ currentScreen, isMetamaskInstalled, connectedMetamaskAccount, setConnectedMetamaskAccount }) {

    async function connectMetamask() {
        try {
            const { ethereum } = window;
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length !== 0) {
                const account = accounts[0];
                setConnectedMetamaskAccount(account);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Flex px={{ base: 2, md: 32 }} py={{ base: 2, md: 8 }} justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }} >
            <Image src={Logo} alignSelf="center" />
            {
                currentScreen != "mint-postcard"
                &&
                <Box mt={{ base: 4, md: 0 }} >
                    {
                        isMetamaskInstalled && connectedMetamaskAccount === ""
                            ?
                            <PrimaryButton text={"Connect metamask"} clickHandler={connectMetamask} />
                            :
                            null
                    }
                </Box>
            }

        </Flex>
    )
}

export default Navbar