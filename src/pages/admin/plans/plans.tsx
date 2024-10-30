
import { useEffect, useState } from "react";
import CustomButton from "../../../components/forms/customButton/customButton";
import SearchInput from "../../../components/forms/searchInput/searchInput";
import Nav from "../../../components/nav/nav.component";
import { Modal } from "react-bootstrap";
import PlanForm from "./plan.component";
import PlansTable from "./plans.table";
import { PlanFilter } from "../../../common/models/filters/plan.filter";
import { PlanService } from "../../../common/http/api/planService";
import { PlanModel } from "../../../common/models/plan.model";
import { toast } from 'react-toastify';




const Plans =() =>{
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [plans, setPlans] = useState<PlanModel[]>([]);
    const [selectedPlan,setSelectedPlan] = useState<PlanModel>(null)
    const [inactivationModalOpen, setInactivationModalOpen] =
    useState<boolean>(false);
    const _planService = new PlanService();
    const handleAddClick = () => {
      setIsFormModalOpen(true);
    };
    useEffect(()=>{
      getPlans()
    },[])
    const handleSearchClick = () => {
      //@ts-ignore
      getPlans({title:searchTerm})
    };
    const handleModal = (isOpen: boolean = true) => {
      setIsFormModalOpen(isOpen);
   
    };
    const getPlans = (filter?: PlanFilter) => {
      setIsLoading(true);
      _planService
        .getAll(filter ?? new PlanFilter())
        .then((response: any) => {
          setPlans(response?.length ? response : []);
        })
        .catch((e: any) => {
          let message = "Error ao obter capitulos.";
          if (e.response?.data?.length > 0 && e.response.data[0].message)
            message = e.response.data[0].message;
          if (e.response?.data?.detail) message = e.response?.data?.detail;
          console.log("Erro: ", message, e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  
    const handlerEdit=()=>{
      
    }
    const handlerDelete=(plan:PlanModel)=>{
        console.log(plan)
        setInactivationModalOpen(true)
        setSelectedPlan(plan)
    }
    const handlerDeleteConfirm =()=>{
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
    return (<>
        <Nav />
      <main
        className="main bg-iautorpb-4"
        style={{ minHeight: "676px", flex: 1 }}
      >
        <section className="container" id="title">
          <div className="row">
            <p className="mt-4 p-0 f-12">
              <span className="fw-bold">Home/ </span>Planos
            </p>
            <h1 className="mt-0 p-0">Planos</h1>
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
           <PlansTable data={plans} handlerDelete={handlerDelete} handlerEdit={handlerEdit} isLoading={isLoading}></PlansTable>
        </section>
        <Modal show={isFormModalOpen} onHide={() => handleModal(false)} centered size="lg" backdrop="static" fullscreen>
          <Modal.Header closeButton className="bg-white border-0 pb-0">
            <Modal.Title>
              {1==1 ? "Criar novo plano" : "Editar plano"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white pt-0">
            <PlanForm handleModal={handleModal} />
          </Modal.Body>
        </Modal>

        <Modal show={inactivationModalOpen} onHide={() => setInactivationModalOpen(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Inativação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Você tem certeza que deseja inativar este capítulo?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
               className="btn border-1 rounded-5 f-14 px-4 py-2"
               style={{ border: '1px solid #dee2e6' }}
              onClick={()=>setInactivationModalOpen(false)}>
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
    </>)
}
export default Plans;