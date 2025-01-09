import { Nav, Tab } from "react-bootstrap";
import { testemonial_ball } from "../../../assets/svg/index";

const SectionTestemonials =() =>{

    return (
      <>
        <h2 className="pt-4 pb-3">Depoimentos</h2>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <div className="row w-75 ">
            <Tab.Content className="testemonial-content">
              <Tab.Pane eventKey="first">
                <p>
                  <strong>
                    {" "}
                    Transformei minha ideia em um livro completo!{" "}
                  </strong>
                  <br></br>
                  "Nunca imaginei que seria tão fácil dar vida à minha história.
                  A plataforma é intuitiva, cheia de recursos úteis e realmente
                  me ajudou a organizar e editar o livro dos meus sonhos. A
                  primeira cópia impressa ficou incrível!"{" "}
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <p>
                  <strong> Uma experiência emocionante e prática </strong>
                  <br></br>
                  "A possibilidade de criar um livro do zero, no meu ritmo, foi
                  incrível. A ferramenta de edição é tão simples de usar que até
                  quem não tem experiência se sente um escritor profissional.
                  Receber a versão impressa foi uma emoção indescritível!"
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <p>
                  <strong>
                    Um tributo emocionante à história da minha avó{" "}
                  </strong>
                  <br></br>
                  "Criar o livro de memórias da minha avó foi uma experiência
                  transformadora. A plataforma tornou tudo simples e prático,
                  desde organizar as fotos e histórias até a edição final. Cada
                  página ficou cheia de vida e significado. Quando entreguei o
                  livro para ela, foi emocionante ver suas lágrimas de
                  felicidade ao revisitar momentos tão especiais. Essa
                  ferramenta me ajudou a eternizar nossa história familiar de
                  forma inesquecível."{" "}
                </p>
              </Tab.Pane>
            </Tab.Content>
          </div>
          <div className="row desktopTestemonialShow ">
           
              <Nav fill variant="underline">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    <div className="row">
                      <div className="col-6 text-end">
                        <img src={testemonial_ball} />
                      </div>
                      <div className="col-6 text-start">
                        <span>
                          <strong>Keila Galebe </strong>
                        </span>
                        @KeilaGalebe
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">
                    <div className="row">
                    <div className="col-6 text-end">
                        <img src={testemonial_ball} />
                      </div>
                      <div className="col-6 text-start">
                        <span>
                          <strong>Liana Fonseca </strong>
                        </span>
                        @LianaFonseca
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">
                    <div className="row">
                    <div className="col-6 text-end">
                        <img src={testemonial_ball} />
                      </div>
                      <div className="col-6 text-start">
                        <span>
                          <strong>Luiz Fernandes </strong>
                        </span>
                        @LuizCarlosFernandesJr
                      </div>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            
          </div>

          <div className="row mobileTestemonialShow ">
           
           <Nav fill variant="underline">
             <Nav.Item>
               <Nav.Link eventKey="first">
                  <div className="row">
                    <div className="col-4 text-end" ><img src={testemonial_ball} /></div>
                    <div className="col-8 text-start">  <span>
                       <strong>Keila Galebe </strong>
                     </span><br></br>
                     @KeilaGalebe</div>
                  </div>
               </Nav.Link>
               
             </Nav.Item>
             <Nav.Item>
               <Nav.Link eventKey="second">
                <div className="row">
                    <div className="col-4 text-end">  <img src={testemonial_ball} /></div>
                    <div className="col-8 text-start"> <span>
                       <strong>Liana Fonseca </strong>
                     </span>
                     @LianaFonseca</div>
                  </div>
               </Nav.Link>
             </Nav.Item>
             <Nav.Item>
               <Nav.Link eventKey="third">
               <div className="row">
                    <div className="col-4 text-end">  <img src={testemonial_ball} /></div>
                    <div className="col-8 text-start"> <span>
                       <strong>Luiz Fernandes </strong>
                     </span>
                     @LuizCarlosFernandesJr</div>
                  </div>
               </Nav.Link>
             </Nav.Item>
           </Nav>
         
       </div>
        </Tab.Container>
      </>
    );
}
export default SectionTestemonials;