import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from './Navigations/Navbar'
import Content from './Home/Content'
import { Routes, Route } from 'react-router-dom'
import { HStack, StackDivider } from '@chakra-ui/react'
import { useWindowSizeContext } from './Context/WindowSizeContext'
import News from './Explore/Main'
import Friends from './Friends/Main'
import Bookmark from './Bookmark/Main'
import Profile from './Profile/Main'
import Login from './Login/Main'

const queryClient = new QueryClient()

const MainContent = (Component, windowType) => {

  return (
    <HStack height={'100vh'} divider={<StackDivider borderColor='gray.200' />} >
      <NavBar />
      {Component}
    </HStack>
  )
}

function App() {

  const windowType = useWindowSizeContext()

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='Content' element={MainContent(<Content />, windowType)}></Route>
          <Route index element={<Login></Login>}></Route>
          <Route path='/Signup' element={<Login type={'Signup'}></Login>}></Route>
          <Route path='/Explore' element={MainContent(<News />, windowType)}></Route>
          <Route path='/Friends' element={MainContent(<Friends />, windowType)}></Route>
          <Route path='/Bookmark' element={MainContent(<Bookmark />, windowType)}></Route>
          <Route path='/Profile/:username' element={MainContent(<Profile />, windowType)}></Route>
        </Routes>
      </QueryClientProvider>
    </ChakraProvider >
  )
}

export default App
