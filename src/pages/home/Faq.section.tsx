
import {  faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import AccordionContext from 'react-bootstrap/AccordionContext';

const SectionFaq =() =>{



    function ContextAwareToggle({ children, eventKey, callback }:any) {
        const { activeEventKey } = useContext(AccordionContext);
      
        const decoratedOnClick = useAccordionButton(
          eventKey,
          () => callback && callback(eventKey),
        );
      
        const isCurrentEventKey = activeEventKey === eventKey;
      
        return (
           <> <strong>{children}</strong>{' '}<div className='header-faq'><button
            type="button" className="btn btn-primary rounded-circle btn-sm"
            onClick={decoratedOnClick}
          >
           { !isCurrentEventKey ?  <FontAwesomeIcon icon={faAdd}  /> : <FontAwesomeIcon icon={faClose} /> }
          </button>
          </div></>
        );
      }
      
    return (
      <>
        <h2 className='fw-bold pt-5'>Perguntas frequentes (FAQ)</h2>
        <p className='pt-3 pb-5'>
          Tudo o que você precisa saber sobre a nossa plataforma,<br></br> serviços e
          políticas.
        </p>
        <Accordion defaultActiveKey="0" className='accordion-faq'>
      <Card className='mb-3 w-75'>
        <Card.Header className='card-header-faq'>
          <ContextAwareToggle eventKey="0">Posso cancelar o serviço?</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>O serviço não pode ser cancelado uma vez que todas as perguntas são disponibilizadas. Mas você tem até 15 meses para escrever.</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className='mb-3 w-75'>
      <Card.Header className='card-header-faq'>
          <ContextAwareToggle eventKey="1">Posso não imprimir o livro?</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>Sim</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className='mb-3 w-75'>
      <Card.Header className='card-header-faq'>
          <ContextAwareToggle eventKey="2">Consigo dividir minha assinatura com alguém?</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>Ut facilisis ex eos blandit sanctus magna lorem stet dolor et aliquip ea stet duo dolores no sadipscing amet sanctus sed wisi lorem nulla labore ea et et consetetur ut magna ipsum sed accusam accusam</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className='mb-3 w-75'>
      <Card.Header className='card-header-faq'>
          <ContextAwareToggle eventKey="3">Posso solicitar mais cópias do livro?</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body>Lorem et sea nonummy takimata dolore ipsum lorem tation est tempor praesent invidunt takimata rebum at magna dolor ex clita voluptua et duo tempor dolore amet vero rebum nostrud</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
      
      </>
    );
}
export default SectionFaq;