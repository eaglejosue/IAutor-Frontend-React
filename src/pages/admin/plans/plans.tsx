
import { useEffect, useState } from "react";
import CustomButton from "../../../components/forms/customButton/customButton";
import SearchInput from "../../../components/forms/searchInput/searchInput";
import { Modal } from "react-bootstrap";
import PlanForm from "./plan.component";
import PlansTable from "./plans.table";
import { PlanFilter } from "../../../common/models/filters/plan.filter";
import { PlanService } from "../../../common/http/api/planService";
import { PlanModel } from "../../../common/models/plan.model";
import { toast } from 'react-toastify';
import NavAdmin from '../../../components/nav/nav-admin.component';

const Plans = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [plans, setPlans] = useState<PlanModel[]>([]);
  //@ts-ignore
  const [selectedPlan, setSelectedPlan] = useState<PlanModel>(null)
  //@ts-ignore
  const [selectedPlanEdit, setSelectedPlanEdit] = useState<PlanModel>(null)
  //@ts-ignore
  const [duplicatedPlan, setDuplicatedPlan] = useState<PlanModel>(null)
  const [inactivationModalOpen, setInactivationModalOpen] = useState<boolean>(false);
  const _planService = new PlanService();

  const handleAddClick = () => {
    //@ts-ignore
    setSelectedPlanEdit(null)
    setIsFormModalOpen(true);
  };

  useEffect(() => {
    getPlans()
  }, [])

  const handleSearchClick = () => {
    //@ts-ignore
    getPlans({ title: searchTerm })
  };

  const handleModal = (isOpen: boolean = true) => {
    setIsFormModalOpen(isOpen);
    handleSearchClick()
  };

  const getPlans = (filter?: PlanFilter) => {
    setIsLoading(true);
    _planService
      .getAll(filter ?? new PlanFilter())
      .then((response: any) => {
        setPlans(response?.length ? response : []);
      })
      .catch((e: any) => {
        let message = "Error ao obter capítulos.";
        if (e.response?.data?.length > 0 && e.response.data[0].message)
          message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlerEdit = (plan: PlanModel) => {
    setSelectedPlanEdit(plan)
    setIsFormModalOpen(true)
  }

  const handlerDelete = (plan: PlanModel) => {
    console.log(plan)
    setInactivationModalOpen(true)
    setSelectedPlan(plan)
  }

  const handlerDeleteConfirm = () => {
    setIsLoading(true);

    _planService
      .delete(selectedPlan.id)
      .then(() => {
        toast.success('plano inativado com sucesso!', {
          position: 'top-center',
          style: { minWidth: 400 }
        });
      })
      .catch((e) => {
        let message = 'Error ao salvar dados.';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        toast.error(message, {
          position: 'top-center',
          style: { minWidth: 400 }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });

    setInactivationModalOpen(false);
  }

  const handleDuplicateClick = (plan: PlanModel) => {
    console.log(plan)
    setDuplicatedPlan(plan)
  }

  return (
    <>
      <NavAdmin />

      <main className='main bg-iautor pb-4'
        style={{ minHeight: '70vh' }}
      >

        <section className='container' id='title'>
          <div className='row'>
            <h4 className='mt-3 p-0'>Planos</h4>
          </div>
        </section>

        <section className="container border-top" id="filter">
          <div className="row my-4">
            <div
              className="col-8 col-md-3 col-sm-6"
              style={{ paddingLeft: "0" }} >
              <SearchInput
                placeholder="Buscar planos"
                onChange={(e) => setSearchTerm(e)}
                onEnter={handleSearchClick} />
            </div>
            <div className="col-auto me-auto">
              <CustomButton onClick={handleSearchClick} disabled={isLoading} />
            </div>
            <div className="col-auto" style={{ paddingRight: "0" }}>
              <CustomButton
                onClick={handleAddClick}
                disabled={isLoading}
                text="Novo"
                materialText="add"
              />
            </div>
          </div>
        </section>

        <section className="container mt-3 px-0" id="table-perfis">
          { //@ts-ignore
            <PlansTable data={plans} handlerDelete={handlerDelete}
              handlerEdit={handlerEdit} isLoading={isLoading} handleDuplicateClick={handleDuplicateClick}></PlansTable>
          }
        </section>

        <Modal show={isFormModalOpen} onHide={() => handleModal(false)} centered size="xl" backdrop="static" keyboard={false}>
          <Modal.Header closeButton className="bg-white border-0 pb-0">
            <Modal.Title>{selectedPlanEdit == null ? "Criar plano" : "Editar plano"}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white">
            <PlanForm handleModal={handleModal} planEdit={selectedPlanEdit} />
          </Modal.Body>
        </Modal>

        <Modal show={inactivationModalOpen} onHide={() => setInactivationModalOpen(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Inativação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Você tem certeza que deseja inativar este plano?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn border-1 rounded-5 f-14 px-4 py-2"
              style={{ border: '1px solid #dee2e6' }}
              onClick={() => setInactivationModalOpen(false)}>
              Não
            </button>
            <button
              className="btn btn-primary text-white rounded-5 f-14 px-4 py-2"
              onClick={handlerDeleteConfirm}>
              Sim
            </button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  )
}
export default Plans;