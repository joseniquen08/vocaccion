import { Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

type Props = {
  onClose?: () => void;
  icon: IconType;
  children: string | JSX.Element;
  activeItem?: boolean;
  mx?: number;
  pl?: string;
}

export const NavItem = ({ onClose, icon, children, activeItem, ...rest}: Props) => {
  return (
    <Flex
      align='center'
      px='6'
      rounded='md'
      py={{ base: '3.5', md: '2.5'}}
      w='full'
      cursor='pointer'
      color={activeItem ? 'white' : 'gray.400'}
      _hover={{
        bg: `${activeItem ? '' : 'whiteAlpha.50'}`,
      }}
      role='group'
      fontWeight='500'
      fontSize='0.87rem'
      transition='.15s ease'
      bg={activeItem ? 'whiteAlpha.100' : 'transparent'}
      onClick={onClose}
      {...rest}
    >
      {icon && (
        <Icon
          mr='3'
          boxSize='5'
          as={icon}
        />
      )}
      {children}
    </Flex>
    );
}
