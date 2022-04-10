import React from 'react'
import {
    Box,
    Flex,
    Image
} from "@chakra-ui/react";
import Logo from "../../assets/logo.svg";
import PrimaryButton from '../PrimaryButton';

function Navbar() {
    return (
        <Flex px={{ base: 2, md: 32 }} py={{ base: 2, md: 8 }} justify="space-between" align={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }} >
            <Image src={Logo} alignSelf="center" />
            <Box mt={{ base: 4, md: 0 }} >
                <PrimaryButton text={"Connect metamask"} />
            </Box>
        </Flex>
    )
}

export default Navbar