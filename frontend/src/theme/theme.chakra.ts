import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
}

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
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' })
);

export const modalAddTheme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'gray.800',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top'
            },
          },
        },
      },
    },
  },
});
