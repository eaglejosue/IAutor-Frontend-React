import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

import { OrderService } from "../../common/http/api/orderService";
import { AuthenticatedUserModel } from "../../common/models/authenticated.model";
import { OrderModel } from "../../common/models/order.model";
import { ParamService } from "../../common/http/api/paramService";
import { ParamModel } from "../../common/models/param.model";

import constParams from "../../common/constants/constParams";
import paths from "../../routes/paths";
import LogoIugu from "../../assets/img/LogoIugu.png";
import Nav from "../../components/nav/nav.component";
import PaymentForm from "../../components/paymentForm/paymentForm.component";

const MyAccount = () => {
  const navigate = useNavigate();
  const param = useParams();

  const [load1, setLoad1] = useState<boolean>(false);
  const _paramService = new ParamService();
  const [paramModel, setParamModel] = useState<ParamModel>(new ParamModel());

  const [planId, setPlanId] = useState(0);
  //const [load2, setLoad2] = useState<boolean>(false);
  // const _planService = new PlanService();
  // const [plan, setPlanModel] = useState<PlanModel>(new PlanModel());

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const _orderService = new OrderService();

  // const isLoading = load1 || load2;
  const isLoading = load1;

  useEffect(() => {
    getParam(constParams.Terms);
    //getPlan(parseInt(param.id!));
    setPlanId(parseInt(param.id!));

    const user = AuthenticatedUserModel.fromLocalStorage();
    if (user?.token) setAcceptedTerms(true);
  }, []);

  const getParam = (key: string) => {
    setLoad1(true);

    _paramService
      .getByKey(key)
      .then((response: any) => {
        setParamModel(new ParamModel(response));
      })
      .catch((e) => {
        let message = "Error ao obter termos.";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
        setLoad1(false);
      });
  };

  // const getPlan = (id: number) => {
  //   setLoad2(true);

  //   _planService
  //     .getById(id)
  //     .then((response: any) => {
  //       setPlanModel(new PlanModel(response));
  //     })
  //     .catch((e) => {
  //       let message = "Error ao obter termos.";
  //       if (e.response?.data?.length > 0 && e.response.data[0].message)
  //         message = e.response.data[0].message;
  //       if (e.response?.data?.detail) message = e.response?.data?.detail;
  //       console.log("Erro: ", message, e);
  //     })
  //     .finally(() => {
  //       setLoad2(false);
  //     });
  // };

  const handleTermsAcceptanceChange = (accepted: boolean) =>
    setAcceptedTerms(accepted);

  const handleConfirmPayment = () => {
    if (!acceptedTerms) {
      toast.error(
        "Por favor, aceite os termos e condições antes de prosseguir.",
        {
          position: "top-center",
          style: { minWidth: 600 },
        },
      );
      return;
    }

    //Verifica se usuário está logado antes de gerar Order
    const user = AuthenticatedUserModel.fromLocalStorage();
    if (!user?.token) {
      toast.warning("Realize o login para prosseguir");
      setTimeout(() => {
        navigate(`${paths.LOGIN}?redirect=${paths.PAYMENT_TERMS}/${planId}`);
        return;
      }, 100);
    }

    //Verifica se usuário cadastrou CPF
    if (!user!.isValid) {
      navigate(
        `${paths.MY_ACCOUNT}?redirect=${paths.PAYMENT_TERMS}/${planId}`,
      );
      toast.warning("CPF e Data de Nascimento obrigatórios para cadastro!", {
        position: "top-center",
        style: { minWidth: 600 },
      });
      return;
    }

    setIsModalOpen(true);

    _orderService
      .post(
        new OrderModel({
          userId: user!.id,
          bookId: user!.lastBookId,
          planId: planId
        }),
      )
      .then((response: any) => {
        if (response.bookId) {
          const user = AuthenticatedUserModel.fromLocalStorage()!;
          user.lastBookId = response.bookId;
          AuthenticatedUserModel.saveToLocalStorage(user);
        }
        toast.warning(
          "Após o pagamento confirmado você poderá ver o registro do livro.",
          {
            position: "top-center",
            style: { minWidth: 600 },
          },
        );
        // if (response.iuguFaturaSecureUrl) {
        //   window.location.href = response.iuguFaturaSecureUrl;
        //   toast.warning(
        //     "Após o pagamento confirmado você poderá ver o registro do livro.",
        //     {
        //       position: "top-center",
        //       style: { minWidth: 600 },
        //     },
        //   );
        // } else {
        //   toast.error("Error ao criar pedido.");
        // }
        navigate(paths.MY_HISTORIES);
      })
      .catch((e) => {
        let message = "Error ao criar pedido!";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        toast.error(message, {
          position: "top-center",
          style: { minWidth: 600 },
        });
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  return (
    <>
      <main className="container" style={{ minHeight: "760px" }}>
        <Nav viewPlanBtn={false} />

        <div className="row">
          <div className="col-10 offset-1 mb-5">
            <h2 className="fw-bold">Termos e Condições</h2>
            <PaymentForm
              onTermsAcceptanceChange={handleTermsAcceptanceChange}
              onConfirmPayment={handleConfirmPayment}
              termsAndConditions={paramModel.value}
              acceptedTerms={acceptedTerms}
              isLoading={isLoading}
            />
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm text-light ms-2"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </div>
        </div>
      </main>

      <Modal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "150px" }}
          >
            <span
              className="spinner-border spinner-border-sm ms-2"
              role="status"
              aria-hidden="true"
              style={{ width: "50px", height: "50px" }}
            ></span>
          </div>
          <div className="d-flex w-100 justify-content-center align-items-center">
            <img src={LogoIugu} alt="Logo Iugu" />
          </div>
          <p className="d-flex justify-content-center align-items-center fw-bold f-24 mt-4 mb-0">
            Aguarde um instante!
          </p>
          <p className="text-center">
            Você será redirecionado para a página do nosso parceiro de
            pagamento.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyAccount;
