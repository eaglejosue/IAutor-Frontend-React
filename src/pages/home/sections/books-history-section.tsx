import { Button, Dropdown, Table } from "react-bootstrap"
import { bookuserbooks } from "../../../assets/svg";
import { differenceInDays  } from 'date-fns';
import React from "react";

import { BookModel } from "../../../common/models/book.model";
import { AuthenticatedUserModel } from "../../../common/models/authenticated.model";
import { useNavigate } from "react-router-dom";
import paths from "../../../routes/paths";

interface BooksHistoryProps{
  book: BookModel |null;
  user: AuthenticatedUserModel | null;
}
 const BooksHistory =({book,user}:BooksHistoryProps)=>{
  const navigate = useNavigate();

  const CustomToggle = React.forwardRef(({ children, onClick }:any, ref) => (
        <a
          href=""
          style={{textDecoration:'none'}}
          //@ts-ignore
          ref={ref}
          onClick={e => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
          <span className="threedots" />
        </a>
      ));
      const getInitialName = (firstName: string |undefined,lastName: string|undefined) => {
       
        return `${firstName!=undefined? firstName[0]  : ''}`.toLocaleUpperCase()+
        `${lastName!=undefined? lastName[0]  : ''}`.toLocaleUpperCase();
      };
    return (
      <>
        <div
          className="col-12 border rounded bg-white"
          style={{ minHeight: "250px" }}
        >
          <div className="row m-5">
            <div className="col-8">
              <h4>
                <strong>Histórias recentes</strong>
              </h4>
              <p>Histórias recentemente criadas ou modificadas por você.</p>
            </div>
            <div className="col-2">
              <Button
                variant=" btn-secondary"
                className=" rounded-5  f-14  p-3"
              >
                <strong>Criar história</strong>
              </Button>
            </div>
            <div className="col-2">
              <Button
                variant="outline-secondary"
                className=" rounded-5  f-14  p-3"
                onClick={() => navigate(paths.MY_HISTORIES)}
              >
                <strong>Vá para minhas histórias</strong>
              </Button>
            </div>
          </div>
          <div className="row m-5">
            <div className="col-12">
              <Table className="tableUser" >
                <thead>
                  <tr className="tableHeadUserLogged text-uppercase">
                    <th>Título</th>
                    <th>Status</th>
                    <th>Data de criação</th>
                    <th>Data de publicação</th>
                    <th>Criador por</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody className="align-middle ">
                    <tr >
                        <td >
                            <div className="row">
                                <div className="col-auto"><img alt="MyHistory"  src={bookuserbooks} ></img></div>
                                <div className="col-auto">
                                  <span>{book?.title}</span><br></br>
                                  <span>{book?.description}  {book?.updatedAt !=null?  `Última edição há ${differenceInDays(new Date(), book?.updatedAt)} dias`: ''} </span>
                                </div>
                            </div>
                        </td>
                        <td className="">
                            <span className="border rounded-5  py-2 p-2">Degustação</span>
                        </td>
                        <td>
                                {
                                new Date(book?.createdAt!=undefined?book?.createdAt:new Date()).toLocaleDateString('pt-BR')}
                                
                        </td>
                        <td>
                                -
                        </td>
                        <td>
                            <span className="border rounded-5  py-2 p-2">{getInitialName(user?.firstname,"miquelleto")}</span>
                        </td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} />
                                <Dropdown.Menu  title="">
                                <Dropdown.Item>Visualizar</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </>
    );
}
export default BooksHistory