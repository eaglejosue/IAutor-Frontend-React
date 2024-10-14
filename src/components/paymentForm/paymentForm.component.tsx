import { useState } from 'react';
import { Card } from 'react-bootstrap';

import './paymentForm.component.scss';
import useScreenSize from '../../hooks/useScreenSize';
import Spinners from '../../assets/svg/SvgSpinners180Ring.svg';

export interface PaymentFormProps {
  onTermsAcceptanceChange: (accepted: boolean) => void;
  onConfirmPayment: () => void;
  termsAndConditions?: string;
  acceptedTerms: boolean;
  isLoading: boolean;
}

const PaymentForm = (p: PaymentFormProps) => {
  const { isLargeScreen, isExtraLargeScreen } = useScreenSize();
  const Container = isExtraLargeScreen || isLargeScreen ? Card : 'div';
  const [errorMessage, setErrorMessage] = useState('');

  const handlePaymentConfirmation = () => {
    if (!p.acceptedTerms) {
      setErrorMessage("Antes de prosseguir, por favor, confirme que leu e concorda com nossos termos e condições.");
    } else {
      setErrorMessage('');
      p.onConfirmPayment();
    }
  }

  return (
    <div className="payment-form-container">
      <Container className="mt-4">
        <Card.Body>
          <div className="terms-and-conditions">
            <div className='bg-body-bg p-4 rounded terms-and-conditions  ' style={{ maxHeight: '390px', overflowY: 'auto' }}>
              <p className='fw-bold f-19'>Termos e Condições</p>
              {p.termsAndConditions?.length &&
                <p className="terms-text f-14" style={{ whiteSpace: 'pre-line' }}>
                  {p.termsAndConditions}
                </p>
              }
              {p.isLoading &&
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                  <img src={Spinners} style={{ width: '50px', height: '50px' }} alt="Loading spinner" />
                </div>
              }
            </div>
            <label className='mt-4 mb-3 f-14'>
              <input type="checkbox" className='mr-1' checked={p.acceptedTerms}
                onChange={(e) => {
                  p.onTermsAcceptanceChange(e.target.checked);
                  setErrorMessage('');
                }}
              />
              Li e concordo com os <span className='fw-bold'>Termos e Condições</span> da plataforma
            </label>
          </div>

          <div className='d-flex justify-content-center align-items-center'>
            {errorMessage && <span className="text-danger f-14">{errorMessage}</span>}
          </div>

          <button
            className='btn bg-IAutor text-white w-100 p-3 mt-1'
            onClick={handlePaymentConfirmation}
          >
            Efetuar Pagamento
            {p.isLoading &&
              <span
                className="spinner-border spinner-border-sm text-light ms-2"
                role="status"
                aria-hidden="true"
              ></span>
            }
          </button>

          <div className='mt-3 px-4'>
            <p className="text-center text-icon f-14 mb-0">
              *Para visualizar o vídeo e receber alertas de divulgação na data de lançamento, você precisa fazer login na plataforma.
            </p>
          </div>
        </Card.Body>
      </Container>
    </div>
  );
}

export default PaymentForm;
