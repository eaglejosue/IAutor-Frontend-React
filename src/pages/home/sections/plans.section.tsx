import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import paths from '../../../routes/paths';
import { PlanFilter } from "../../../common/models/filters/plan.filter";
import { useEffect, useState } from "react";
import { PlanService } from "../../../common/http/api/planService";
import { PlanItens, PlanModel } from "../../../common/models/plan.model";

const SectionPlan = () => {
  const navigate = useNavigate();

  const _planService = new PlanService();
  const [plans, setPlans] = useState<PlanModel[]>([]);

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
    <div className="mb-5">
      <h5 className="text-primary text-uppercase">Pacotes</h5>
      <h3>
        <strong>Conheça nossos Pacotes e Preços</strong>
      </h3>
      <p className="mt-3 mb-5">
        Descubra a flexibilidade e benefícios das nossas ofertas de pacotes para<br></br> atender suas necessidades especificas
      </p>

      <div className="row">
        {
          plans?.map((r: PlanModel) => {
            return (
              <div className="col-sm-12 col-lg-4 mt-2" >
                <div className="card" style={{ minHeight: '500px' }}>
                  <div className="card-body text-start">
                    <h5 className="m-2">
                      <strong>{r.title}</strong>
                    </h5>
                    <div className="row ">
                      <div className="col-12 m-2">
                        <h1>
                          <strong>{r.currency} {r.price}</strong>{" "}
                          <small className="fs-6"></small>
                        </h1>
                      </div>
                    </div>
                    <p className="mb-5 m-2">
                      {r.description}
                    </p>
                    <hr />
                    <ul className="mt-5 mb-4 f-14">
                      {
                        r.planItems?.map((r: PlanItens, a: number) => {
                          return (
                            <li key={a.toString()} className="fw-bold">{r.description}</li>
                          )
                        })
                      }
                    </ul>
                    <div className="row text-center">
                      <div className="mb-4" style={{ position: 'absolute', bottom: '0px' }}>
                        <Button variant="secondary" className="rounded-5 f-14 px-5 p-3" size="lg"
                          onClick={() => { navigate(paths.NEW_HISTORY) }}
                        >
                          Experimentar agora
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }

      </div>

    </div>
  );
}
export default SectionPlan