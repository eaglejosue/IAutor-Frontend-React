import { Button } from "react-bootstrap";
import NavUserOptions from "../../components/nav/nav-user-options.component";
import Sidebar from "../../components/nav/sidebar.component";
import { PlanItens, PlanModel } from "../../common/models/plan.model";
import { useNavigate } from "react-router-dom";
import paths from "../../routes/paths";
import { useEffect, useState } from "react";
import { PlanFilter } from "../../common/models/filters/plan.filter";
import { PlanService } from "../../common/http/api/planService";
import '../home/home.scss'

const PricingPlans = ()=>{
  const navigate = useNavigate();

    const [plans, setPlans] = useState<PlanModel[]>([]);
    const _planService = new PlanService();

      useEffect(() => {
        //@ts-ignore
        getPlans({ isActive: true })
      }, [])
      
        const getPlans = (filter?: PlanFilter) => {
      
          _planService
            .getAll(filter ?? new PlanFilter())
            .then((response: any) => {
              setPlans(response?.length ? response : []);
            })
            .catch((e: any) => {
              let message = "Error ao obter planos.";
              if (e.response?.data?.length > 0 && e.response.data[0].message)
                message = e.response.data[0].message;
              if (e.response?.data?.detail) message = e.response?.data?.detail;
              console.log("Erro: ", message, e);
            })
            .finally(() => {
      
            });
        };
    return (
      <>
        <div className="d-flex" style={{ height: "100vh" }}>
          <Sidebar navItem="my-histories" />
          <div className="flex-grow-1">
            <header className="bg-white border-bottom p-3">
              <div className="row align-items-center justify-content-beetwen">
                <div className="col-auto fw-bold f-18 pe-0">IAutor /</div>
                <div className="col-auto f-18 ps-1">Pacotes e preços</div>
                <div className="col">
                  <NavUserOptions />
                </div>
              </div>
            </header>

            <main className="main ">
              <div className="container-fluid">
                <div className="row m-2">
                  <div className="col-12 text-center">
                    <h4>
                      <strong>Pacotes e preços </strong>
                    </h4>
                    <p>
                      Planos e Preços Descubra a flexibilidade e benefícios das
                      nossas ofertas de preços para atender suas necessidades
                      específicas.
                    </p>
                  </div>
                </div>
                <div className="row m-5">
                  
                    {plans?.map((r: PlanModel) => {
                      return (
                        <div className="col-sm-12 col-lg-4 mt-2">
                          <div className="card" style={{ minHeight: "500px" }}>
                            <div className="card-body text-start">
                              <h5 className="m-2">
                                <strong>{r.title}</strong>
                              </h5>
                              <div className="row ">
                                <div className="col-12 m-2">
                                  <h1>
                                    <strong>
                                      {r.currency} {r.price}
                                    </strong>{" "}
                                    <small className="fs-6"></small>
                                  </h1>
                                </div>
                              </div>
                              <p className="mb-5 m-2">{r.description}</p>
                              <hr />
                              <ul className="mt-5 mb-4 f-14">
                                {r.planItems?.map((r: PlanItens, a: number) => {
                                  return (
                                    <li key={a.toString()} className="fw-bold">
                                      {r.description}
                                    </li>
                                  );
                                })}
                              </ul>
                              <div className="row text-center">
                                <div
                                  className="mb-4"
                                  style={{
                                    position: "absolute",
                                    bottom: "0px",
                                  }}
                                >
                                  <Button
                                    variant="secondary"
                                    className="rounded-5 f-14 px-5 p-3"
                                    size="lg"
                                    onClick={() => {
                                      navigate(paths.NEW_HISTORY);
                                    }}
                                  >
                                    Comprar agora
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                 
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    );
}
export default PricingPlans;