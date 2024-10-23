
import { useState } from "react";
import CustomButton from "../../../components/forms/customButton/customButton";
import SearchInput from "../../../components/forms/searchInput/searchInput";
import Nav from "../../../components/nav/nav.component";
import { Modal } from "react-bootstrap";
import PlanForm from "./plan.component";


const Plans =() =>{
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const handleAddClick = () => {
        setIsFormModalOpen(true)
      };
      const handleSearchClick = () => {
       
      };
      const handleModal = (isOpen: boolean = true) => {
        setIsFormModalOpen(isOpen);
        
      };
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
            <p>Dados</p>
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

       


      </main>
    </>)
}
export default Plans;