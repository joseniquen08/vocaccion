import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme({
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    colors: {
      primary: '#0F4C81',
    },
    components: {
      Button: {
        baseStyle: {
          _focus: {
            outline: 0,
            boxShadow: 'none',
          },
        },
      },
      Checkbox: {
        baseStyle: {
          control: {
            _focus: {
              boxShadow: 'none',
            },
          },
        },
      },
      Link: {
        baseStyle: {
          _focus: {
            outline: 0,
            boxShadow: 'none',
          },
          _hover: {
            textDecoration: 'none',
          },
          fontWeight: 500,
        },
      },
      MenuItem: {
        baseStyle: {
          fontWeight: 500,
        },
      },
      Input: {
        baseStyle: {
          _focus: {
            boxShadow: 'none',
          },
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' })
);
