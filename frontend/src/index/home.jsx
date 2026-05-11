import Header from '../../components/index/header';
import myLogo from '../assets/logo.png';
import Hook from '../../components/index/home';
import Service from '../../components/index/service';
import Owners from '../../components/index/owners';

import Testimonials from '../../components/index/testimony';
import Contact from '../../components/index/contact_us';
import Footer from '../../components/index/footer';
import EthioXChat from '../../components/index/chatbot';
import { ThemeProvider } from '../context/ThemeContext';

function Home() {
  return (
     <ThemeProvider>
      <Header logoSrc={myLogo} />
      <Hook />
      <Service />
      <Owners/>
      <Testimonials/>
      <Contact/>
      <Footer/>
      <EthioXChat/>
    </ThemeProvider>
  );
}
export default Home
