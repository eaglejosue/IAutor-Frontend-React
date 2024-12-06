
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
           { !isCurrentEventKey ?  <FontAwesomeIcon icon={faAdd} width={12}  /> : <FontAwesomeIcon width={12} icon={faClose} /> }
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
        <Card.Header className='card-header-faq mt-2'>
          <ContextAwareToggle eventKey="0">Posso cancelar o serviço?</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Temos certeza de que, uma vez que você começar a escrever o livro da sua vida ou de alguém querido, não vai querer parar. No entanto, se, por algum motivo, você decidir cancelar, é possível solicitar o cancelamento e o estorno dos valores pagos dentro de até 7 (sete) dias corridos, conforme previsto na lei do consumidor. 
          Vale lembrar que essa condição é válida apenas se o livro não tiver sido finalizado e/ou enviado para impressão. </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className='mb-3 w-75'>
      <Card.Header className='card-header-faq mt-2'>
          <ContextAwareToggle eventKey="1">Posso não imprimir o livro?</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body><p>Sim, você pode optar por não imprimir o livro. No entanto, é importante lembrar que, nos pacotes pagos, a impressão da primeira cópia é gratuita, incluindo o frete para todo o território brasileiro. </p>
          <p>Caso deseje imprimir o livro em uma gráfica externa, isso também é possível. No entanto, tenha em mente que a versão virtual do livro será gerada com uma marca d'água do nosso logo. </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className='mb-3 w-75'>
      <Card.Header className='card-header-faq mt-2'>
          <ContextAwareToggle eventKey="2">Consigo dividir minha assinatura com alguém?</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <p>
            Cada pacote é único e dá direito à criação de um livro por CPF. Caso você deseje que alguém contribua com a escrita de algum capítulo, recomendamos que essa pessoa utilize um editor de texto para escrever e, em seguida, envie o conteúdo para que você possa colá-lo diretamente na plataforma.
            </p>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card className='mb-3 w-75'>
      <Card.Header className='card-header-faq mt-2'>
          <ContextAwareToggle eventKey="3">Posso solicitar mais cópias do livro?</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body>

            <p>
            Sim! Mesmo após a primeira impressão, você pode solicitar novas cópias do livro. Contamos com a parceria de uma gráfica digital que oferece impressões de alta qualidade a preços acessíveis. Todo o processo é realizado de forma online, e o livro será entregue diretamente na sua casa. 
            </p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
      
      </>
    );
}
export default SectionFaq;