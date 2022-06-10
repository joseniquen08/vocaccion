import { gql, useQuery } from "@apollo/client";
import { Box, Heading, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { CardUser } from "./CardUser";
import { ModalUser } from "./ModalUser";

const GET_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
      image
      role
      provider
      emailVerifiedV
    }
  }
`;

export const Users = () => {

  const { loading: loadingUsers, data: dataUsers } = useQuery(GET_USERS);
  const [selectedUser, setSelectedUser] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUser = (user) => {
    setSelectedUser(user);
    onOpen();
  }

  return (
    <Box>
      <Heading
        mt='0.5rem'
        fontSize='3xl'
        textAlign='center'
        color='white'
      >
        Usuarios
      </Heading>
      <Box overflowX='auto' display='block' color='gray.200' px={2} py={7}>
        <SimpleGrid columns={2} spacing={3.5}>
          {
            dataUsers && (
              dataUsers.getAllUsers.map((user) => (
                <CardUser
                  key={user.id}
                  user={user}
                  handleUser={handleUser}
                  {...user}
                />
              ))
            )
          }
        </SimpleGrid>
        {
          selectedUser && (
            <ModalUser isOpen={isOpen} onClose={onClose} user={selectedUser}/>
          )
        }
      </Box>
    </Box>
  )
}