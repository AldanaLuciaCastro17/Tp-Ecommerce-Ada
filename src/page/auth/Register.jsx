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
  username: string().required('Campo requerido'),
  email: string().email('Email invalido').required('Campo requerido'),
  password: string().min(8, 'Minimo 8 caracteres').required('Campo requerido'),
})

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const dispatch = useDispatch()
  const toast = useToast()

  const onSubmit = async ({ username, email, password }) => {
    const response = await fetch(
      'http://localhost:1337/api/auth/local/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      }
    )
    const dataUser = await response.json()
    dispatch(login(dataUser))
    toast({
      title: 'Te registraste con exito!',
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
        <FormControl isInvalid={errors.username} isRequired>
          <FormLabel htmlFor="username">Usuario</FormLabel>
          <Input id="username" {...register('username')} />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

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
          Crear cuenta
        </Button>
      </Stack>
    </>
  )
}
