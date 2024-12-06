import { image_who } from "../../../assets/img"
const SectionWho =() =>{

    return (
      <>
        <div className="row align-items-center text-justify mt-5 mb-5">
          <div className="col-6  ">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <h2><strong>Para quem o IAutor se destina?</strong></h2>
              </div>
              <div className="col-2"></div>
            </div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <p className="mt-3 mb-4">
                  Para você que tem muita história para contar! Aproveite para
                  relembrar todos aqueles momentos especiais e registre para os
                  seus familiares e amigos.
                </p>
              </div>
              <div className="col-2"></div>
            </div>
            <div className="row">

              <div className="col-md-10 offset-md-2">
                <a className="btn btn-primary rounded-5 f-14 px-5 py-3  btn-lg" href="#plans" > <strong>Experimente Criar uma História</strong></a>
                </div>
            </div>

          </div>

          <div className="col-6 text-end">
            <img
              alt="Pai e filho"
              className="img-fluid"

              src={image_who}
            />
          </div>
        </div>
      </>
    );
}
export default SectionWho