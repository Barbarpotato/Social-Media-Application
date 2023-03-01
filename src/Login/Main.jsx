import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Box, VStack, Input, Button, Text, Spinner, Center, Heading } from '@chakra-ui/react'
import { userAccount, addAccount } from '../Fetch/Account'
import { useCustomQuery } from '../Custom/useCustomQuery'
import { useCustomMutation } from '../Custom/useCustomMutations'

const isAccountExisted = (dataPoint, name, email) => {
    const checkUserName = dataPoint.find(property => property.username === name)
    const checkEmail = dataPoint.find(property => property.email === email)
    if (checkUserName !== undefined || checkEmail !== undefined) {
        return [true, checkUserName]
    }
    else return false
}

const isAccountAuthenticated = (dataPoint, name, password) => {
    const checkPassword = dataPoint.find(property => property.password === password)
    const checkUserName = dataPoint.find(property => property.username === name)
    if (checkPassword !== undefined || checkUserName !== undefined) {
        return [true, checkUserName]
    } else return [false, null]

}

function Login({ type }) {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [isLoggedin, setIsLoggedin] = useState('check')

    const { data: UserAccount, isLoading: loadingUser } = useCustomQuery('user-account', userAccount)
    const { mutate: RegisterAccount, isSuccess: RegisterSuccess } = useCustomMutation(addAccount, 'user-content')

    const handleLoginButton = () => {
        setIsLoading(true)
        setTimeout(() => {
            const [UserExist, account] = isAccountAuthenticated(UserAccount, name, password)
            if (UserExist) {
                sessionStorage.setItem('user-account', JSON.stringify({
                    id: account.id, username: account.username,
                    email: account.email, profilePicture: account.profilePicture
                }))
                setIsLoggedin(true)
            }
            else {
                setIsLoggedin(false)
                setError('Wrong Password or Username, Please Try Again!')
            }
            setIsLoading(false)
        }, 3000)
    }

    const handleSignupButton = () => {
        setIsLoading(true)
        setTimeout(() => {
            const [UserExist, account] = isAccountExisted(UserAccount, name, email)
            if (UserExist) {
                setError('Username already used!')
                setIsLoggedin(false)
                setIsLoading(false)
            }
            else {
                sessionStorage.setItem('user-account', JSON.stringify({
                    id: account.id, username: account.username,
                    email: account.email, profilePicture: account.profilePicture
                }))
                RegisterAccount({ username: name, password, email })
                setIsLoading(false)
            }
        }, 3000)
    }

    if (loadingUser) {
        return (
            <Center>
                <Spinner size='xl' color='twitter' />
            </Center>
        )
    }

    if (RegisterSuccess) return <Navigate to={'/'} />

    return (
        <Box>
            <VStack marginY={'200px'} spacing={10}>
                <Heading colorScheme={'purple'} color={'#885cd4'}><em>Social Media App</em></Heading>
                <Input focusBorderColor='#885cd4' onChange={(e) => setName(e.target.value)} colorScheme={'twitter'} placeholder='Username' width={'300px'} />
                {type === 'Signup' ? <Input onChange={(e) => setEmail(e.target.value)} colorScheme={'twitter'} placeholder='Email Address' width={'300px'} /> : null}
                <Input focusBorderColor='#885cd4' onChange={(e) => setPassword(e.target.value)} colorScheme={'twitter'} type={'password'} placeholder='Password' width={'300px'} />
                <Button colorScheme={'purple'} isLoading={isLoading} onClick={type === 'Signup' ? handleSignupButton : handleLoginButton} width={'300px'}>
                    {type === 'Signup' ? 'Signup' : 'Login'}</Button>
                {error ? <Text color={'red'}>{error}</Text> : null}
                {isLoggedin && isLoggedin !== 'check' ? <Navigate to="/Content" ></Navigate> : null}
                {type === 'Signup' ? <Text>Already have an account? <Link to={'/'}><strong>Login</strong></Link> Here</Text>
                    :
                    <Text>Dont have an Account? <Link to={'/Signup'}><strong>Signup</strong></Link> Here</Text>}
            </VStack>
        </Box>
    )
}

export default Login