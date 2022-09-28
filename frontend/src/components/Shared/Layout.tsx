import { Box } from '@chakra-ui/react';
import { UserType } from '../../types/auth';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

type Props = {
  isLogged: boolean;
  user: UserType;
  children: JSX.Element;
}

export const Layout = ({ isLogged, user, children }: Props) => {
  return (
    <Box minHeight='100vh'>
      <Navbar isLogged={isLogged} user={user}/>
        {children}
      <Footer/>
    </Box>
  )
}
