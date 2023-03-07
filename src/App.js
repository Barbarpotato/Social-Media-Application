import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from './Navigations/Navbar'
import Content from './Home/Content'
import { Routes, Route } from 'react-router-dom'
import { HStack, StackDivider } from '@chakra-ui/react'
import News from './Explore/Main'
import Friends from './Friends/Main'
import Bookmark from './Bookmark/Main'
import Profile from './Profile/Main'
import Login from './Login/Main'

const queryClient = new QueryClient()

const MainContent = (Component) => {
  return (
    <HStack height={'100vh'} divider={<StackDivider borderColor='gray.200' />} >
      <NavBar />
      {Component}
    </HStack>
  )
}

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/Content' element={MainContent(<Content />)}></Route>
          <Route index element={<Login></Login>}></Route>
          <Route path='/Signup' element={<Login type={'Signup'}></Login>}></Route>
          <Route path='/Explore' element={MainContent(<News />)}></Route>
          <Route path='/Friends/:category/:id' element={MainContent(<Friends />)}></Route>
          <Route path='/Bookmark' element={MainContent(<Bookmark />)}></Route>
          <Route path='/Profile/:id' element={MainContent(<Profile />)}></Route>
        </Routes>
      </QueryClientProvider>
    </ChakraProvider >
  )
}

export default App
