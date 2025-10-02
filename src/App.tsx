import { FC } from "react";
import Header from './components/header/Header'
import Tasks from './components/tasks/Tasks'
import Footer from './components/footer/Footer'

const App: FC = () => {
  return (
    <>
      <Header />
      <Tasks />
      <Footer />
    </>
  )
}

export default App
