import { Button } from "react-bootstrap";
import { homelogged } from "../../../assets/svg";
import { AuthenticatedUserModel } from "../../../common/models/authenticated.model";


interface EmptyHomeLoggedProps{
    user: AuthenticatedUserModel |null;
}
const EmptyHomeLogged =({user}:EmptyHomeLoggedProps)=>{

    return (
      <>
        <div className="col-4 pt-5">
          <strong>
            <h3>Bem vindo, {user?.firstname + " " + user?.lastname}</h3>
          </strong>
          <p>Comece criando uma primeira história.</p>
        </div>
        <div className="col-8 rectangle-right-admin p-4">
          <img
            className="img-fluid mb-2"
            src={homelogged}
            alt="button home logged"
          ></img>
          <p>
            <strong>Faça uma Degustação</strong>
          </p>
          <p>
            Relembre e escreva um lindo livro de memórias e <br></br>
            momentos, Experimente!
          </p>
          <Button
            variant=" btn-custom-gray-2"
            className=" rounded-5  f-14  p-3">
            <strong>Começar</strong>
          </Button>
        </div>
      </>
    );
}
export default EmptyHomeLogged;