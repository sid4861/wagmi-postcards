import {
    Box,
    Heading,
    Text,
    Grid,
    GridItem,
    HStack,
    Image
} from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react'
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
import imagesArray from '../../data/images';

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

    const THRESHOLD = 15;

    const itemsRef = useRef([]);

    const mouseMoveHandler = (idx, e) => {
        const next = itemsRef.current[idx];
        console.log({ next });
        const { clientX, clientY, currentTarget } = e;
        const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;
        const horizontal = (clientX - offsetLeft) / clientWidth;
        const vertical = (clientY - offsetTop) / clientHeight;

        const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
        const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

        next.style.transform =
            `perspective(${clientWidth}px) rotateX(${rotateY / 2.8}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
    };

    const mouseLeaveHandler = (idx, e) => {
        const next = itemsRef.current[idx];
        next.style.transform =
            `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
    };

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
                {
                    imagesArray.map((imageSrc, index) => (
                        <GridItem key={index} >
                            <div
                                ref={el => itemsRef.current[index] = el}
                                onMouseMove={(event) => mouseMoveHandler(index, event)}
                                onMouseLeave={(event) => mouseLeaveHandler(index, event)}
                            >
                                <Image src={imageSrc} />
                            </div>
                        </GridItem>
                    ))
                }
            </Grid>
        </Box>
    );
}
export default LandingPage