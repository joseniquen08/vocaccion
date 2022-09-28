import { gql, useQuery } from '@apollo/client';
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from 'react';
import { GetInfoDashboardHomeType } from '../../../../types/admin/dashboardTypes';

const GET_INFO_DASHBOARD = gql`
  query GetInfoDashboardHome {
    getInfoDashboardHome {
      totalCareers
      totalUniversities
      totalUsers
      totalComments
    }
  }
`;

export const Home = () => {

  const { loading, data, refetch } = useQuery<GetInfoDashboardHomeType>(GET_INFO_DASHBOARD);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box>
      <VStack spacing={5} overflowX='auto' display='block' color='gray.200' px={2} py={4}>
        <Text fontWeight={500} fontSize='2xl'>Cifras totales</Text>
        {
          data && (
            <SimpleGrid columns={2} spacing={4}>
              <Box cursor='pointer' bg='blackAlpha.600' px={5} py={3} rounded='md' border='1px solid' borderColor='gray.700'>
                <VStack alignItems='start' spacing={0}>
                  <Text noOfLines={1} fontSize='3xl' fontWeight={700}>Carreras</Text>
                  <Text fontSize='6xl' fontWeight={700}>{data.getInfoDashboardHome.totalCareers}</Text>
                </VStack>
              </Box>
              <Box cursor='pointer' bg='blackAlpha.600' px={5} py={3} rounded='md' border='1px solid' borderColor='gray.700'>
                <VStack alignItems='start' spacing={0}>
                  <Text noOfLines={1} fontSize='3xl' fontWeight={700}>Universidades</Text>
                  <Text fontSize='6xl' fontWeight={700}>{data.getInfoDashboardHome.totalUniversities}</Text>
                </VStack>
              </Box>
              <Box cursor='pointer' bg='blackAlpha.600' px={5} py={3} rounded='md' border='1px solid' borderColor='gray.700'>
                <VStack alignItems='start' spacing={0}>
                  <Text noOfLines={1} fontSize='3xl' fontWeight={700}>Usuarios</Text>
                  <Text fontSize='6xl' fontWeight={700}>{data.getInfoDashboardHome.totalUsers}</Text>
                </VStack>
              </Box>
              <Box cursor='pointer' bg='blackAlpha.600' px={5} py={3} rounded='md' border='1px solid' borderColor='gray.700'>
                <VStack alignItems='start' spacing={0}>
                  <Text noOfLines={1} fontSize='3xl' fontWeight={700}>Comentarios</Text>
                  <Text fontSize='6xl' fontWeight={700}>{data.getInfoDashboardHome.totalComments}</Text>
                </VStack>
              </Box>
            </SimpleGrid>
          )
        }
      </VStack>
    </Box>
  )
}
