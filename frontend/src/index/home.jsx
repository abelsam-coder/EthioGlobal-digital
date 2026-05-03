import Header from '../../components/index/header';
import myLogo from '../assets/logo.png';
import Hook from '../../components/index/home';
import Service from '../../components/index/service';
import Owners from '../../components/index/owners';
import Portfolio from '../../components/index/portfolio';
import Testimonials from '../../components/index/testimony';
import Contact from '../../components/index/contact_us';
import Footer from '../../components/index/footer';
import EthioXChat from '../../components/index/chatbot';

function Home() {
  return (
    <div className="bg-[#050505] min-h-screen">
      <Header logoSrc={myLogo} />
      <Hook />
      <Service />
      <Owners/>
      <Portfolio/>
      <Testimonials/>
      <Contact/>
      <Footer/>
      <EthioXChat/>
    </div>
  );
}
export default Home
