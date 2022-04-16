import {
    Box,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    FormHelperText,
    Textarea,
    Text,
    Spinner
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PrimaryButton from "../../components/PrimaryButton";
import { encode, decode } from 'js-base64';
import addresses from "../../data/artist-addresses-rinkeby";
import axios from "axios";
import { ethers, utils } from 'ethers';
import WagmiPostcard from "../../utils/WagmiPostcard.json";

export default function MintNft() {

    const { state } = useLocation();
    const [ethAddress, setEthAddress] = useState("");
    const [postalAddress, setPostalAddress] = useState("");
    const [message, setMessage] = useState("");
    const [isPostcardMinting, setIsPostcardMinting] = useState(false);
    const [currentTokenId, setCurrentTokenId] = useState(null);
    const messageRef = useRef();

    const CONTRACT_ADDRESS = process.env.NODE_ENV === "development" ? process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS : process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS;
    const CONTRACT_ABI = WagmiPostcard.abi;

    useEffect(() => {
        async function _getMintedCount() {
            try {
                const { ethereum } = window;
                const provider = new ethers.providers.Web3Provider(ethereum);
                const wagmipostcardContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
                const mintedCount = await wagmipostcardContract.getMintedCount();
                setCurrentTokenId(mintedCount.toString());
            } catch (error) {
                console.log(error);
            }
        }
        _getMintedCount();
    }, [])

    const mintPostcard = async () => {

        console.log(message);
        let textContainer = messageRef.current;     // The element with the text.
        console.log(textContainer);

        const img = document.createElement("img");
        img.setAttribute('src', state.imageSrc);

        let canvas = document.createElement("canvas");
        let tokenURI = "";

        // Draw the image on the canvas.
        let drawImage = () => {
            let ctx = canvas.getContext("2d");	// Create canvas context.
            // Assign width and height.
            console.log({ w: img.width, h: img.height });
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image.
            ctx.drawImage(img, 0, 0);

            textContainer.style.border = 0;

            // Get the padding etc.
            let left = parseInt(window.getComputedStyle(textContainer).left);
            let right = textContainer.getBoundingClientRect().right;
            let top = parseInt(window.getComputedStyle(textContainer).top, 0);
            let center = textContainer.getBoundingClientRect().width / 2;
            console.log({ left, right, top, center });
            let paddingTop = window.getComputedStyle(textContainer).paddingTop.replace('px', '');
            let paddingLeft = window.getComputedStyle(textContainer).paddingLeft.replace('px', '');
            let paddingRight = window.getComputedStyle(textContainer).paddingRight.replace('px', '');
            console.log({ paddingTop, paddingLeft, paddingRight });
            // Get text alignement, colour and font of the text.
            let txtAlign = window.getComputedStyle(textContainer).textAlign;
            let color = window.getComputedStyle(textContainer).color;
            let fnt = window.getComputedStyle(textContainer).font;
            console.log({ txtAlign, color, fnt });
            // Assign text properties to the context.
            // ctx.font = fnt;
            ctx.font = ctx.font.replace(/\d+px/, (parseInt(ctx.font.match(/\d+px/)) + 16) + "px");
            ctx.fillStyle = color;
            ctx.textAlign = txtAlign;

            // Now, we need the coordinates of the text.
            let x; 		// coordinate.
            if (txtAlign === 'right') {
                x = right + parseInt(paddingRight) - 11;
            }
            if (txtAlign === 'left') {
                x = left + parseInt(paddingLeft);
            }
            if (txtAlign === 'center') {
                x = center + left;
            }

            const wordsArray = message.split(' ');
            const wordsArrayWithLineBreak = [];
            wordsArray.forEach((word, index) => {
                if (index % 4 === 0 && index !== 0) {
                    wordsArrayWithLineBreak.push("\n");
                    wordsArrayWithLineBreak.push(word);
                } else {
                    wordsArrayWithLineBreak.push(word);
                }
            });

            let strFirst = wordsArrayWithLineBreak.join(" ");

            // Get the text (it can a word or a sentence) to write over the image.
            let str = strFirst.replace(/\n\r?/g, '<br />').split('<br />');


            console.log({ str });
            // finally, draw the text using Canvas fillText() method.
            for (let i = 0; i <= str.length - 1; i++) {

                ctx.fillText(
                    str[i]
                        .replace('</div>', '')
                        .replace('<br>', '')
                        .replace(';', ''),
                    800,
                    parseInt(paddingTop, 10) + parseInt(320, 10) + 35 + (i * 35)
                );
            }

            // document.body.append(canvas);  // Show the image with the text on the Canvas.
        }

        let downloadImage = (img_name) => {
            let a = document.createElement('a');
            a.href = canvas.toDataURL("image/png");
            console.log(canvas.toDataURL("image/png"));
            a.download = img_name;
            document.body.appendChild(a);
            a.click();
        }

        async function mint() {
            const postcardImageBase64Url = canvas.toDataURL("image/png");
            const tokenMetadata = JSON.stringify({
                name: "wagmi postcards",
                description: "Send a thoughtful NFT post card that lasts forever, a physical copy also gets delivered to the address of the recipient.",
                image: postcardImageBase64Url
            });
            console.log(tokenMetadata);
            const tokenMetadataBase64 = encode(tokenMetadata);
            tokenURI = `data:application/json;base64,${tokenMetadataBase64}`;
            console.log(tokenURI);
            console.log(addresses[state.index]);
            try {
                const { ethereum } = window;
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wagmipostcardContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                let txn = await wagmipostcardContract.mintWagmiPostcard(addresses[state.index], ethAddress,
                    {
                        value: utils.parseEther("0.013")
                    }
                );
                await txn.wait();

            } catch (error) {

            }
        }

        async function saveToDatabase() {
            const apiPayload = {
                tokenId: Number(currentTokenId),
                recipientEthAddress: ethAddress,
                recipientPostalAddress: postalAddress,
                imageURI: canvas.toDataURL("image/png"),
                artistEthAddress: addresses[state.index],
                mintedDate: new Date(),
                timezoneOffset: -1 * new Date().getTimezoneOffset()
            }
            try {
                const response = await axios.post("http://localhost:7500/postcard", apiPayload);
            } catch (error) {
                console.log(error);
            }

        }
        drawImage();
        setIsPostcardMinting(true);
        await saveToDatabase();
        await mint();
        setIsPostcardMinting(false);
        setPostalAddress("");
        setEthAddress("");
        setMessage("");
        downloadImage("wagmi-postcard");    // Download the processed image.
        alert(`you can view your NFT at https://testnets.opensea.io/assets/${process.env.REACT_APP_RINKEBY_CONTRACT_ADDRESS}/${currentTokenId}`);

    }

    return (
        <Box>
            <Navbar currentScreen="mint-postcard" />
            <Container maxW={"6xl"} >
                <Flex direction={{ base: "column", md: "row" }} justifyContent="space-around" alignItems={"center"} mt={4} >
                    <Box
                        position={"relative"}
                        padding={0}
                        minW="250px"
                        minH={"250px"}
                    >
                        <Image src={state.imageSrc} w="600px" h="auto" maxW={"100%"} />
                        <Box
                            position={"absolute"}
                            p={"5px"}
                            top={40}
                            w="28%"
                            right={16}
                            background="rgba(0, 0, 0, 0.1)"
                            cursor={"move"}
                            color="black"
                            fontSize={12}
                            textAlign="left"
                            ref={messageRef}
                            whiteSpace="pre-wrap"
                        >
                            {message}
                        </Box>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel htmlFor="eth-address" color={"primary"} >Eth address</FormLabel>
                            <Input id="eth-address" type="text" focusBorderColor="primary" value={ethAddress} onChange={(event) => setEthAddress(event.target.value)} />
                            <FormHelperText>Please make sure this is a valid Eth address</FormHelperText>
                        </FormControl>
                        <FormControl mt={3} >
                            <FormLabel htmlFor="postal-address" color={"primary"} >Postal address</FormLabel>
                            <Textarea id="postal-address" focusBorderColor="primary" value={postalAddress} onChange={(event) => setPostalAddress(event.target.value)} />
                            <FormHelperText>We currently ship to cities in India</FormHelperText>
                        </FormControl>
                        <FormControl mt={3} >
                            <FormLabel htmlFor="message" color={"primary"} >Message</FormLabel>
                            <Textarea id="message" focusBorderColor="primary" value={message} onChange={(event) => setMessage(event.target.value)} wrap="hard" maxLength={200} />
                            <FormHelperText>200 characters max.</FormHelperText>
                        </FormControl>
                        <Box mt={8} >
                            {
                                isPostcardMinting
                                    ?
                                    <Spinner color="primary" />
                                    :
                                    <PrimaryButton text="Mint" clickHandler={mintPostcard} />
                            }
                        </Box>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}