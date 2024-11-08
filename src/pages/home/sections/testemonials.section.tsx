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
                Amet justo esse dolore dolor dolores ipsum lorem vel eirmod erat
                lorem eos ut doming. Duo feugiat consequat et quis diam facilisi
                dolores et kasd tation stet et lorem stet consequat et esse.
                Nibh clita adipiscing dolore ipsum dolor justo et diam erat sit
                kasd et. Amet tempor justo duo magna eum eos amet nisl dolores
                tempor. Elitr dolore id at imperdiet accusam lorem sit ea ex est
                ipsum labore rebum elitr aliquyam. Eirmod facilisis eirmod
                sanctus diam lorem clita clita vel dolor takimata veniam duo
                sanctus. Ipsum eos gubergren vulputate consequat magna sit magna
                euismod consectetuer et et consequat. Ea et dolor sadipscing
                gubergren duo et laoreet stet et. Eu nonummy rebum dignissim sit
                no ut stet sed. Diam velit et amet. Et dolor takimata facilisis
                rebum stet et sit aliquyam dignissim ipsum erat no sanctus elitr
                lorem gubergren et diam. Qui ipsum clita aliquyam vero gubergren
                et ullamcorper minim at diam et ipsum eirmod congue euismod
                nulla. Nisl no dolore lorem ut lorem consetetur sed takimata
                euismod amet qui duo magna autem takimata. Ipsum ut nostrud
                facer dolor duo aliquip et aliquam elitr eirmod ut. Sea ut qui
                at dolor ea ut vel dolores clita justo et ipsum. Te sit takimata
                sit sit elitr ipsum erat. Dolor exerci dolores elitr ad wisi sit
                sea. Sanctus et eu sed sit sadipscing erat et accusam adipiscing
                velit et sea vero sit et. Et lorem sit dignissim elitr labore
                nihil nibh volutpat dolore ut sed lorem dolor et est sed
                voluptua.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <p>
                  "Utilizar esta plataforma para escrever minha bibliografia foi
                  uma experiência extremamente satisfatória. A usabilidade
                  intuitiva e os recursos bem-organizados facilitaram o
                  processo, permitindo-me focar mais no conteúdo e menos na
                  formatação. A inteligência artificial economizou um tempo
                  valioso. Estou impressionado com a eficiência e a
                  funcionalidade da plataforma, tornando a tarefa de escrever
                  histórias não apenas mais fácil, mas também mais agradável."
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <p>
                Sed sit magna dolores. Nisl sit in dolore tempor in et justo
                iusto congue ad kasd velit ipsum ut justo ipsum aliquip amet.
                Diam duo dolore luptatum blandit kasd dolor ex. Et at ut
                aliquyam volutpat accusam dolore et augue diam dolor. Accusam
                eleifend laoreet. Consetetur aliquyam clita dolor at at duis
                invidunt est sea esse tempor clita ipsum dolore in. Rebum
                sanctus tincidunt illum aliquyam ea sadipscing lorem et
                invidunt. Ut eros et esse kasd sed vero ea invidunt ullamcorper
                clita et dolore amet vel. Eleifend nulla hendrerit consequat no
                labore sanctus no. Ipsum in delenit ea qui consetetur rebum qui
                dolore labore euismod ipsum lorem elitr duo vero sit. At ex
                dolore consetetur dolore dignissim invidunt dolore vero in sed
                ipsum clita aliquyam. Elitr stet consequat kasd justo amet stet
                dolores ipsum amet ea ea. Dolor iusto nonumy gubergren laoreet
                dolores dolore ut stet lorem diam sadipscing nonumy sadipscing
                et. Dolor et accusam vero eirmod amet aliquyam et stet. Lorem
                nonummy labore kasd. Et lorem at rebum. Sit dolore dolore amet
                takimata molestie et sea.</p>
              </Tab.Pane>
            </Tab.Content>
          </div>
          <div className="row ">
            <div className="col-1"></div>
            <div className="col-10"> <hr className="mb-5 mt-4"/></div>
            <div className="col-1"></div>
            <Nav  fill  className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey="first">
                  <div className="row">
                    <div className="col text-end">
                      <img src={testemonial_ball} />
                    </div>
                    <div className="col text-start">
                      <span>
                        <strong>Manoel Gomes</strong>
                      </span>
                      <br></br>@manoelgomes
                    </div>
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">
                  <div className="row">
                  <div className="col text-end">
                      <img src={testemonial_ball} />
                    </div>
                    <div className="col text-start">
                      <span>
                        <strong>Paloma Duarte</strong>
                      </span>
                      <br></br>@palomaduarte
                    </div>
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">
                  <div className="row">
                  <div className="col text-end">
                      <img src={testemonial_ball} />
                    </div>
                    <div className="col text-start">
                      <span>
                        <strong>Josias Oliveira</strong>
                      </span>
                      <br></br>@josiasoliveira
                    </div>
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