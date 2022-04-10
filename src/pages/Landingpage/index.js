import {
    Box,
    Heading,
    Text,
    Grid,
    GridItem,
    HStack,
    Image
} from '@chakra-ui/react';
import React from 'react'
import Navbar from '../../components/Navbar';
import LayerBlurOne from '../../components/LayerBlurOne';
import LayerBlurTwo from '../../components/LayerBlurTwo';
import HeaderGraphic from "../../assets/postcard-header-graphic.svg";
import styles from "../Landingpage/landing-page.module.css";
import EthOne from "../../assets/eth-1.svg";
import EthTwo from "../../assets/eth-2.svg";
import EthThree from "../../assets/eth-3.svg";
import MailOne from "../../assets/mail-1.svg";
import MailTwo from "../../assets/mail-2.svg";
import PostCardOne from "../../assets/postcard-1.svg";
import PostCardTwo from "../../assets/postcard-2.svg";
import PostCardThree from "../../assets/postcard-3.svg";
import PostCardFour from "../../assets/postcard-4.svg";
import PostCardFive from "../../assets/postcard-5.svg";
import PostCardSix from "../../assets/postcard-6.svg";


function LandingPage() {
    return (
        <Box>
            <Navbar />
            <LandingpageHeader />
            <HowItWorks />
            <ExplorePostcards />
        </Box>
    )
}

function LandingpageHeader() {
    return (
        <Box
            px={{ base: 4, md: 32 }}
            py={{ base: 4, md: 8 }}
            display="flex"
            justifyContent="space-between"
            alignItems={{ base: "stretch", md: "center" }}
            flexDirection={{ base: "column", md: "row" }}
            mt={24}
        >
            <Box position={"relative"} w={{ base: "100%", md: "50%" }} >
                <LayerBlurOne />
                <Heading fontWeight={"medium"} size="2xl" maxW={"100%%"} color="primary" >
                    Send nft postcards
                    for 0.01 ETH.
                </Heading>
                <Text color={"text"} maxW={"100%"} mt={8} >
                    Send a thoughtful NFT post card that lasts forever, a physical copy
                    also gets delivered to the address of the recipient. For every postcard minted, the artist gets 0.005 ETH.
                </Text>
            </Box>
            <Box position={"relative"} w={{ base: "100%", md: "50%" }} mt={{ base: 40, md: 0 }} >
                <LayerBlurTwo />
                <img src={HeaderGraphic} className={styles.headerImage} alt="header" />
                <img src={EthOne} alt="coin" className={styles.headerCoinOne} />
                <img src={EthTwo} alt="coin" className={styles.headerCoinTwo} />
                <img src={EthThree} alt="coin" className={styles.headerCoinThree} />
                <img src={MailOne} alt="mail" className={styles.mailOne} />
                <img src={MailTwo} className={styles.mailTwo} />
            </Box>

        </Box>
    );
}

function HowItWorks() {

    return (
        <Box mt={{ base: 40, md: 56 }} >
            <Heading textAlign={"center"} fontWeight={"medium"} size="xl" color={"primary"} >
                How it works ?
            </Heading>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={0} mt={{ base: 4, md: 8 }} borderTopWidth={2} borderTopColor="primary" borderBottomWidth={2} borderBottomColor="primary" >
                <GridItem w='100%' p={{ base: 4, md: 20 }} borderRightWidth={{ base: 0, md: 2 }} borderRightColor="primary" borderBottomWidth={{ base: 2, md: 0 }} borderBottomColor="primary" >
                    <HStack alignItems={"center"} gap={6} >
                        <Heading fontSize={{ base: "80px", md: "120px" }} color="primary"  >
                            1
                        </Heading>
                        <Text color={"text"} fontSize="18px" >
                            <Text as={"span"} color="primary" > Select </Text>
                            a postcard with the artwork you like.
                        </Text>
                    </HStack>
                </GridItem>
                <GridItem w='100%' p={{ base: 4, md: 20 }} borderRightWidth={{ base: 0, md: 2 }} borderRightColor="primary" borderBottomWidth={{ base: 2, md: 0 }} borderBottomColor="primary" >
                    <HStack alignItems={"center"} gap={6} >
                        <Heading fontSize={{ base: "80px", md: "120px" }} color="primary"  >
                            2
                        </Heading>
                        <Text color={"text"} fontSize="18px" >
                            Enter recipent’s ETH address, the postal address and
                            <Text as={"span"} color="primary" > mint the NFT </Text>
                        </Text>
                    </HStack>
                </GridItem>
                <GridItem w='100%' p={{ base: 4, md: 20 }} >
                    <HStack alignItems={"center"} gap={6} >
                        <Heading fontSize={{ base: "80px", md: "120px" }} color="primary"  >
                            3
                        </Heading>
                        <Text color={"text"} fontSize="18px" >
                            The NFT gets minted to the eth address, we also ship
                            <Text as={"span"} color="primary" > a physical postcard </Text>
                            , the artist gets 0.005 ETH in her wallet.
                        </Text>
                    </HStack>
                </GridItem>
            </Grid>
        </Box>
    );
}

function ExplorePostcards() {
    return (
        <Box mt={{ base: 24, md: 32 }} >
            <Heading textAlign={"center"} fontWeight={"medium"} size="xl" color={"primary"} >
                Explore postcards
            </Heading>
            <Text color={"text"} textAlign="center" mt={2} >Click any card to start minting</Text>
            <Grid
                templateRows={{ base: "repeat(1, 1fr)", md: 'repeat(2, 1fr)' }}
                templateColumns={{ base: "repeat(1, 1fr)", md: 'repeat(3, 1fr)' }}
                gap={1}
            >
                <GridItem>
                    <Image src={PostCardOne} />
                </GridItem>
                <GridItem>
                    <Image src={PostCardFour} />
                </GridItem>
                <GridItem>
                    <Image src={PostCardFive} />
                </GridItem>
                <GridItem>
                    <Image src={PostCardSix} />
                </GridItem>
                <GridItem>
                    <Image src={PostCardTwo} />
                </GridItem>
                <GridItem>
                    <Image src={PostCardThree} />
                </GridItem>
            </Grid>
        </Box>
    );
}
export default LandingPage