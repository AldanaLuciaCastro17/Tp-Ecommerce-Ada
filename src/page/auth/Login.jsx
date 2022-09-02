import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slice/authSlice'

const schema = object({
  email: string().email('Email invalido').required('Campo requerido'),
  password: string().min(8, 'Minimo 8 caracteres').required('Campo requerido'),
})

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const dispatch = useDispatch()
  const toast = useToast()

  console.log()

  const onSubmit = async ({ email, password }) => {
    const response = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password }),
    })
    const dataUser = await response.json()
    dispatch(login(dataUser))
    toast({
      title: 'Bienvenido!',
      description: `${dataUser.user.username}`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  // console.log(errors)

  return (
    <>
      <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password} isRequired>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <Input id="password" {...register('password')} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          bg={'#a2baba'}
          color="white"
          _hover={{ bg: 'orange' }}
          isLoading={isSubmitting}
        >
          Iniciar sesion
        </Button>
      </Stack>
    </>
  )
}
