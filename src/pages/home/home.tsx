
import Nav from '../../components/nav/nav.component';
import './Home.css'
//@ts-ignore
import SectionPlan from './Plans.section';
//@ts-ignore
import SectionFaq from './Faq.section';
import SectionWho from './Who.section';
import SectionTestemonials from './Testemonials.section';
import SectionTribute from './Tribute.section';
import SectionHistory from './History.section';

const Home = () => {
 

  return (
    <>
      <div className="container">
        <Nav />
        <section id="their history" className="section-history">
          <SectionHistory />
        </section>
        <section id="tribute" className="section-tribute">
                <SectionTribute />
        </section>
        <section id="who" className="section-who">
          <SectionWho />
        </section>
        <section id="faq" className="section-faq">
            <SectionFaq />
        </section>
        <section id="testemonials" className="section-testemonials">
           <SectionTestemonials />
        </section>
        <section id="plans" className='section-plan' >
                <SectionPlan />
        </section>
      </div>
    </>
  );
};

export default Home;
