import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
    labelmt?: string;
}

const InputBase:ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, labelmt, ...rest }, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            {!!label && < FormLabel mt={labelmt} htmlFor={name}>{label}</FormLabel> }
            <ChakraInput 
                name={name}
                id={name}
                focusBorderColor="orange.500"
                bgColor="gray.900" 
                variant="filled"
                _hover={{
                    bgColor:'gray.900'
                }}
                ref={ref}
                size="lg"
                {...rest}
            />

            {!!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    );
}

export const Input = forwardRef(InputBase)