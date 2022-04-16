import {
    Box,
    Heading,
    Text,
    Grid,
    GridItem,
    HStack,
    Image,
    Container,
    Flex,
    Icon,
    VStack,
    position,
    Link
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
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
import ArtistOne from "../../assets/artist-1.png";
import ArtistTwo from "../../assets/artist-2.png";
import ArtistThree from "../../assets/artist-3.png";
import ArtistFour from "../../assets/artist-4.png";
import ArtistFive from "../../assets/artist-5.png";
import ArtistSix from "../../assets/artist-6.png";

import { FaInstagram, FaTwitter, FaDribbble } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';

function LandingPage() {

    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(true);
    const [connectedMetamaskAccount, setConnectedMetamaskAccount] = useState("");

    function checkIfMetamaskIsInstalled() {
        const { ethereum } = window;
        if (!ethereum) {
            setIsMetamaskInstalled(false);
            alert("Please install metamask extension and refresh the page");
        }
    }

    async function checkIfMetamaskAccountIsConnected() {
        try {
            const { ethereum } = window;
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length !== 0) {
                const account = accounts[0];
                setConnectedMetamaskAccount(account);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @dev checking if metamask is installed on page render
     */
    useEffect(() => {
        checkIfMetamaskIsInstalled();
    }, []);

    /**
     * @dev checking if metamask account is connected to app
     */
    useEffect(() => {
        if (isMetamaskInstalled) {
            checkIfMetamaskAccountIsConnected();
        }
    }, []);

    return (
        <Box>
            <Navbar isMetamaskInstalled={isMetamaskInstalled} connectedMetamaskAccount={connectedMetamaskAccount} setConnectedMetamaskAccount={setConnectedMetamaskAccount} />
            <LandingpageHeader />
            <HowItWorks />
            <ExplorePostcards isMetamaskInstalled={isMetamaskInstalled} connectedMetamaskAccount={connectedMetamaskAccount} />
            <Artists />
            <Footer />
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

function ExplorePostcards({ isMetamaskInstalled, connectedMetamaskAccount }) {

    const THRESHOLD = 15;

    const itemsRef = useRef([]);

    const navigate = useNavigate();

    const mouseMoveHandler = (idx, e) => {
        const next = itemsRef.current[idx];
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
                        <GridItem key={index} cursor="pointer" onClick={() => {
                            if (isMetamaskInstalled && connectedMetamaskAccount !== "") {
                                navigate("/mint-postcard", { state: { "imageSrc": imageSrc, "index": index, "connectedMetamaskAccount": connectedMetamaskAccount } })
                            } else {
                                alert("Check if metamask is installed and connected");
                            }
                        }} >
                            <div
                                ref={el => itemsRef.current[index] = el}
                                onMouseMove={(event) => mouseMoveHandler(index, event)}
                                onMouseLeave={(event) => mouseLeaveHandler(index, event)}
                                onTouchMove={(event => mouseMoveHandler(index, event))}
                                onTouchCancel={(event) => mouseLeaveHandler(index, event)}
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

function Artists() {

    return (
        <Box mt={{ base: 24, md: 32 }} px={{ base: 4, md: 32 }} >
            <Heading textAlign={"center"} fontWeight={"medium"} size="xl" color={"primary"} >
                Artists
            </Heading>
            <Grid
                templateRows={{ base: "repeat(1, 1fr)", md: 'repeat(2, 1fr)' }}
                templateColumns={{ base: "repeat(1, 1fr)", md: 'repeat(3, 1fr)' }}
                mt={16}
                gap={8}
            >
                <GridItem
                    display={"flex"}
                    justifyContent="center"
                >
                    <Box
                        borderRadius={20}
                        alignSelf={"center"}
                        w="300px"
                        h={"300px"}
                        position={"relative"}
                        backgroundImage={ArtistOne}
                        backgroundPosition={"center"}
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                    >
                        <Box
                            background={"linear-gradient(179.57deg, rgba(25, 24, 24, 0) 53.93%, rgba(0, 0, 0, 0.7) 69.06%)"}
                            borderRadius={20}
                            w="300px"
                            h="300px"
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                        >
                        </Box>
                        <VStack alignItems="center" position={"absolute"} bottom={6} left={"34%"} >
                            <Text color={"primary"} fontSize={18} fontWeight="bold" >Siddharth</Text>
                            <HStack>
                                <Icon as={FaInstagram} color="primary" w={6} h={6} />
                                <Icon as={FaTwitter} color="primary" w={6} h={6} />
                                <Icon as={FaDribbble} color="primary" w={6} h={6} />
                            </HStack>
                        </VStack>
                    </Box>
                </GridItem>
                <GridItem
                    display={"flex"}
                    justifyContent="center"
                >
                    <Box
                        borderRadius={20}
                        w="300px"
                        h={"300px"}
                        position={"relative"}
                        backgroundImage={ArtistTwo}
                        backgroundPosition={"center"}
                        backgroundSize="cover"
                        backgroundRepeat="no-repeat"
                    >
                        <Box
                            background={"linear-gradient(179.57deg, rgba(25, 24, 24, 0) 53.93%, rgba(0, 0, 0, 0.7) 69.06%)"}
                            borderRadius={20}
                            w="300px"
                            h="300px"
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                        >
                        </Box>
                        <VStack alignItems="center" position={"absolute"} bottom={6} left={"34%"} >
                            <Text color={"primary"} fontSize={18} fontWeight="bold" >Siddharth</Text>
                            <HStack>
                                <Icon as={FaInstagram} color="primary" w={6} h={6} />
                                <Icon as={FaTwitter} color="primary" w={6} h={6} />
                                <Icon as={FaDribbble} color="primary" w={6} h={6} />
                            </HStack>
                        </VStack>
                    </Box>
                </GridItem>
                <GridItem
                    display={"flex"}
                    justifyContent="center"
                >
                    <Box
                        borderRadius={20}
                        w="300px"
                        h={"300px"}
                        position={"relative"}
                        backgroundImage={ArtistThree}
                        backgroundPosition={"center"}
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"

                    >
                        <Box
                            background={"linear-gradient(179.57deg, rgba(25, 24, 24, 0) 53.93%, rgba(0, 0, 0, 0.7) 69.06%)"}
                            borderRadius={20}
                            w="300px"
                            h="300px"
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                        >
                        </Box>
                        <VStack alignItems="center" position={"absolute"} bottom={6} left={"34%"} >
                            <Text color={"primary"} fontSize={18} fontWeight="bold" >Siddharth</Text>
                            <HStack>
                                <Icon as={FaInstagram} color="primary" w={6} h={6} />
                                <Icon as={FaTwitter} color="primary" w={6} h={6} />
                                <Icon as={FaDribbble} color="primary" w={6} h={6} />
                            </HStack>
                        </VStack>
                    </Box>
                </GridItem>
                <GridItem
                    display={"flex"}
                    justifyContent="center"
                >
                    <Box
                        borderRadius={20}
                        w="300px"
                        h={"300px"}
                        position={"relative"}
                        backgroundImage={ArtistFour}
                        backgroundPosition={"center"}
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"

                    >
                        <Box
                            background={"linear-gradient(179.57deg, rgba(25, 24, 24, 0) 53.93%, rgba(0, 0, 0, 0.7) 69.06%)"}
                            borderRadius={20}
                            w="300px"
                            h="300px"
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                        >
                        </Box>
                        <VStack alignItems="center" position={"absolute"} bottom={6} left={"34%"} >
                            <Text color={"primary"} fontSize={18} fontWeight="bold" >Siddharth</Text>
                            <HStack>
                                <Icon as={FaInstagram} color="primary" w={6} h={6} />
                                <Icon as={FaTwitter} color="primary" w={6} h={6} />
                                <Icon as={FaDribbble} color="primary" w={6} h={6} />
                            </HStack>
                        </VStack>
                    </Box>
                </GridItem>
                <GridItem
                    display={"flex"}
                    justifyContent="center"
                >
                    <Box
                        borderRadius={20}
                        w="300px"
                        h={"300px"}
                        position={"relative"}
                        backgroundImage={ArtistFive}
                        backgroundPosition={"center"}
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"

                    >
                        <Box
                            background={"linear-gradient(179.57deg, rgba(25, 24, 24, 0) 53.93%, rgba(0, 0, 0, 0.7) 69.06%)"}
                            borderRadius={20}
                            w="300px"
                            h="300px"
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                        >
                        </Box>
                        <VStack alignItems="center" position={"absolute"} bottom={6} left={"34%"} >
                            <Text color={"primary"} fontSize={18} fontWeight="bold" >Siddharth</Text>
                            <HStack>
                                <Icon as={FaInstagram} color="primary" w={6} h={6} />
                                <Icon as={FaTwitter} color="primary" w={6} h={6} />
                                <Icon as={FaDribbble} color="primary" w={6} h={6} />
                            </HStack>
                        </VStack>
                    </Box>
                </GridItem>
                <GridItem
                    display={"flex"}
                    justifyContent="center"
                >
                    <Box
                        borderRadius={20}
                        w="300px"
                        h={"300px"}
                        position={"relative"}
                        backgroundImage={ArtistSix}
                        backgroundPosition={"center"}
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"

                    >
                        <Box
                            background={"linear-gradient(179.57deg, rgba(25, 24, 24, 0) 53.93%, rgba(0, 0, 0, 0.7) 69.06%)"}
                            borderRadius={20}
                            w="300px"
                            h="300px"
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                        >
                        </Box>
                        <VStack alignItems="center" position={"absolute"} bottom={6} left={"34%"} >
                            <Text color={"primary"} fontSize={18} fontWeight="bold" >Siddharth</Text>
                            <HStack>
                                <Icon as={FaInstagram} color="primary" w={6} h={6} />
                                <Icon as={FaTwitter} color="primary" w={6} h={6} />
                                <Icon as={FaDribbble} color="primary" w={6} h={6} />
                            </HStack>
                        </VStack>
                    </Box>
                </GridItem>
            </Grid>

        </Box >
    );
}

function Footer() {
    return (
        <Flex mt={{ base: 20, md: 28 }} justifyContent="center" py={8} direction="column" alignItems={"center"} >
            <Text color={"primary"} fontSize={18} >Wagmi postcards</Text>
            <Text mt={2} fontSize={14} >Designed and devloped by <Link isExternal href='https://twitter.com/siddharth0x' color={"primary"} >Siddharth</Link></Text>
            <Text mt={2} fontSize={14} >Artists' profile pictures from  <Link isExternal href='https://nouns.wtf/' color={"primary"} >nouns.wtf</Link></Text>
            <Text mt={2} fontSize={14} >3D illustrations in header by  <Link isExternal href='https://vijayverma.co/' color={"primary"} >Vijay Verma</Link></Text>
        </Flex>
    )
}
export default LandingPage