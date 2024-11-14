import { Table, Tag } from 'antd';
import { useState } from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { QuestionModel } from '../../../common/models/question.model';


export enum QuestionMode{
  registerQuestion,
  registerPlan
}

interface QuestionTableProps {
  data: QuestionModel[],
  isLoading: boolean,
  handlerEdit(question: QuestionModel): void
  handlerDelete(id: Number): void
  mode: QuestionMode
  addItemsPlan(items:QuestionModel[]):void
}

const QuestionTable = (props: QuestionTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [questionsSelected, setQuestionsSelected] = useState<QuestionModel[]>([]);

  const handleDeleteClick = (id: number) => {
    props.handlerDelete(id);
  };

  const handleEditClick = (question: QuestionModel) => {
    props.handlerEdit(question)
  };

  const columnsRegister = [
    {
      title: "Pergunta",
      dataIndex: "title",
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: "Sessão",
      dataIndex: "subject",
      sorter: (a: any, b: any) => a.title.localeCompare(b.subject),
    },
    {
      title: "Data cadastro",
      dataIndex: "createdAt",
      render: (createdAt: string) =>
        createdAt
          ? format(new Date(createdAt), "dd/MM/yyyy", { locale: pt })
          : "N/A",
      align: "center" as "center",
      sorter: (a: any, b: any) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: 'Alterado por',
      dataIndex: 'updatedBy',
      render: (updatedBy: string) => updatedBy ? updatedBy : 'N/A',
      align: 'center' as 'center',
      sorter: (a: any, b: any) => a.updatedBy.localeCompare(b.updatedBy),
    },
    {
      title: "Data alteração",
      dataIndex: "updatedAt",
      render: (updatedAt: string) =>
        updatedAt
          ? format(new Date(updatedAt), "dd/MM/yyyy", { locale: pt })
          : "N/A",
      align: "center" as "center",
      sorter: (a: any, b: any) => a.updatedAt.localeCompare(b.updatedAt),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "geekblue" : "red"}>
          {isActive ? "Ativo" : "Inativo"}
        </Tag>
      ),
      align: "center" as "center",
      filters: [
        { text: "Ativo", value: true },
        { text: "Inativo", value: false },
      ],
      onFilter: (value: any, record: QuestionModel) =>
        record.isActive === value,
      filterSearch: true,
    },
    {
      title: "Ação",
      key: "action",
      render: (record: QuestionModel) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <span
            className="material-symbols-outlined"
            onClick={() => handleEditClick(record)}
            style={{
              cursor: "pointer",
              fontSize: "20px",
              marginRight: "0.3rem",
            }}
            title="Editar"
          >
            edit
          </span>
          {record.isActive && (
            <span
              className="material-symbols-outlined"
              onClick={() => handleDeleteClick(record.id)}
              style={{ cursor: "pointer", fontSize: "20px" }}
              title="Deletar"
            >
              delete
            </span>
          )}
        </div>
      ),
      align: "center" as "center",
    },
  ];
  const handlerCheckQeustion=(capitulo:QuestionModel,checked:boolean)=>{

    capitulo.selected = checked;
    if(checked)
       setQuestionsSelected(prevState => ([...prevState, capitulo]))
     else{
       var array = [...questionsSelected]; // make a separate copy of the array
       var index = array.indexOf(capitulo)
       if (index !== -1) {
         array.splice(index, 1);
         setQuestionsSelected(array);
       }
     }

  }
  const columnsRegisterPlan = [
    {
      title: "Titulo",
      dataIndex: "title",
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: "Sessão",
      dataIndex: "subject",
      sorter: (a: any, b: any) => a.title.localeCompare(b.subject),
    },
    {
      title: "Ação",
      key: "action",
      render: (record: QuestionModel) => (
        <div
        >
          <input type='checkbox'   onChange={(e)=> handlerCheckQeustion(record,e.target.checked)}  ></input>

        </div>
      ),
      align: "center" as "center",
    },
  ];
  return (
    <>
    <Table
      className='custom-table'
      rowKey="id"
      dataSource={props.data}
      columns={props.mode == QuestionMode.registerQuestion? columnsRegister:columnsRegisterPlan}
      locale={{ emptyText: 'Nenhum dado disponível.' }}
      loading={props.isLoading}
      pagination={{
        current: currentPage,
        pageSize: itemsPerPage,
        total: props.data.length,
        onChange: (page, pageSize) => {
          setCurrentPage(page);
          setItemsPerPage(pageSize);
        },
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50, 100],
        locale: { items_per_page: ' itens' }
      }}
    />

   {props.mode == QuestionMode.registerPlan && <div className="d-flex justify-content-end mt-4">
              <button
                className="btn btn-primary rounded-5 f-14 px-4 py-2 mx-2"
                type="button"
                style={{ border: "1px solid #dee2e6" }}
                onClick={(e) => {
                  e.preventDefault();
                  props.addItemsPlan(questionsSelected)
                  //props.handleModal(false);
                }}
              >
                Adicionar perguntas ao capítulo
              </button>
            </div>}
    </>
  )
}

export default QuestionTable