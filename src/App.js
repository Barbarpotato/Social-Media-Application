import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from './Navigations/Navbar'
import Content from './Home/Content'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HStack, StackDivider } from '@chakra-ui/react'
import { useWindowSizeContext } from './Context/WindowSizeContext'
import Trends from './Others/Trends'
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
      {windowType === 'Desktop' ? <Trends /> : null}
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
          <Route path='/Profile' element={MainContent(<Profile />, windowType)}></Route>
        </Routes>
      </QueryClientProvider>
    </ChakraProvider >
  )
}

export default App
