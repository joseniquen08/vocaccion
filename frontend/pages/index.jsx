import { Box } from "@chakra-ui/react";
import { Features } from "../components/Home/Features";
import { Header } from "../components/Home/Header";
import { Navbar } from "../components/Navbar";

const HomePage = () => {
  return (
    <Box minH='100vh'>
      <Navbar/>
      <Header/>
      <Features/>
    </Box>
  )
}

export default HomePage;