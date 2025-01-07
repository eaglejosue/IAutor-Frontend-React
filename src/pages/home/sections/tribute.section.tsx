import { image_tribute_left_down, image_tribute_left_up, image_tribute_right } from "../../../assets/img";

const SectionTribute=() =>{

    return (
      <>
        <div className="row align-items-center text-center">
          <div className="col-lg-12">
            <h2><strong>Para Homenagear</strong></h2>
            <p className="mt-3 mb-5">
              Imagine a emoção de presentear seus pais, avós ou alguém muito
              importante para você, com um livro da história de vida dele.
            </p>
          </div>
          <div className="col-lg-6 text-start">
          <img alt="Pai e filho" className="mb-4 img-fluid"  src={image_tribute_left_up} />
          <img alt="Pai e filho" className="img-fluid" src={image_tribute_left_down} />
          </div>

          <div className="col-lg-6 text-end mt-4">
            <img alt="Pai e filho" className="img-fluid"  src={image_tribute_right} />
          </div>
        </div>
      </>
    );
}
export default SectionTribute;