
import SectionPlan from './sections/plans.section';
import SectionFaq from './sections/faq.section';
import SectionWho from './sections/who.section';
import SectionTestemonials from './sections/testemonials.section';
import SectionTribute from './sections/tribute.section';
import SectionHistory from './sections/history.section';

import Nav from '../../components/nav/nav.component';

import './home.scss'

const Home = () => {

  return (
    <div className="container">
      <Nav />
      <section id="history" className="section-history">
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
  );
};

export default Home;
