import { Button } from "react-bootstrap";

const SectionPlan =() =>{

    return (
      <div className="mb-5">
        <h5 className="text-primary text-uppercase">Assinatura</h5>
        <h3>
          <strong>Conheça nossos Planos e Preços</strong>
        </h3>
        <p className="mt-3 mb-5">
          Descubra a flexibilidade e benefícios das nossas ofertas de assinatura
          para <br />
          atender suas necessidades específicas.
        </p>
        <div className="row">
          <div className="divLeft">
            <div className="card">
              <div className="card-body text-start m-3">
                <h5>
                  <strong>Degustação</strong>
                </h5>
                <div className="row">
                  <div className="col-12">
                    <h1>
                      <strong>R$ 0</strong>{' '}<small className="fs-6">grátis</small>
                    </h1>
                  </div>
                </div>

                <p className="mb-5">
                  Lorem ipsum dolor sit amet dolor siti conse ctetur adipiscing
                  elit.{" "}
                </p>
                <hr />
                <ul className="mt-5 mb-4 f-14">
                  <li className="fw-bold">10 até 50 Páginas</li>
                  <li className="fw-bold">1 até 3 fotos Autorais</li>
                  <li className="fw-bold">
                    +R$100,00 / Livro Impresso (opcional)
                  </li>
                  <li className="fw-bold">Lorem Ipsum dolor</li>
                  <li className="fw-bold">Lorem Ipsum dolor</li>
                </ul>

                <div className="d-grid gap-2 mb-3">
                  <Button
                    variant="secondary"
                    className=" rounded-5  f-14 px-2 p-3"
                    size="lg"
                  >
                    Experimentar agora
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="divCenter">
            <div className="card card-inter">
              <div className="card-body text-start  m-3">
              <h5>
                  <strong>Intermediário</strong>
                </h5>
                <div className="row">
                  <div className="col-8">
                    <h1>
                      <strong>R$ 199</strong>{' '}<small className="fs-6">/mês</small>
                    </h1>
                  </div>
                  <div className="col-4">
                  <Button
                    variant=" btn-custom-gray-2"
                    className=" rounded-5  f-14  p-2" 
                    size="sm"
                  >
                    <strong>Padrão</strong>
                  </Button>
                  </div>
                </div>

                <p className="mb-5">
                  Lorem ipsum dolor sit amet dolor siti conse ctetur adipiscing
                  elit.{" "}
                </p>
                <hr />
                <ul className="mt-5 mb-4 f-14">
                  <li className="fw-bold">51 até 100 Páginas</li>
                  <li className="fw-bold">4 até 5 fotos Autorais</li>
                  <li className="fw-bold">
                    +R$100,00 / Livro Impresso (opcional)
                  </li>
                  <li className="fw-bold">Lorem Ipsum dolor</li>
                  <li className="fw-bold">Lorem Ipsum dolor</li>
                </ul>

                <div className="d-grid gap-2 mb-3">
                  <Button
                    variant=" btn-custom-gray-2"
                    className=" rounded-5  f-14 px-4 p-3"
                    size="lg"
                  >
                    Comprar agora
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="divRight">
            <div className="card">
              <div className="card-body text-start  m-3">
              <h5>
                  <strong>Premium</strong>
                </h5>
                <div className="row">
                  <div className="col-12">
                    <h1>
                      <strong>R$ 399</strong>{' '}<small className="fs-6">/mês</small>
                    </h1>
                  </div>
                  
                </div>

                <p className="mb-5">
                  Lorem ipsum dolor sit amet dolor siti conse ctetur adipiscing
                  elit.{" "}
                </p>
                <hr />
                <ul className="mt-5 mb-4 f-14">
                  <li className="fw-bold">101 até 200 Páginas</li>
                  <li className="fw-bold">6 ou 7 fotos Autorais</li>
                  <li className="fw-bold">
                    +R$100,00/Livro Impresso (opcional)
                  </li>
                  <li className="fw-bold">Lorem Ipsum dolor</li>
                  <li className="fw-bold ">Lorem Ipsum dolor</li>
                </ul>
                <div className="d-grid gap-2 mb-3">
                  <Button
                    variant="secondary"
                    className=" rounded-5  f-14 px-4 p-3"
                    size="lg"
                  >
                    Comprar agora
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default SectionPlan