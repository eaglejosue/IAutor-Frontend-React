import { Table, Tag } from 'antd';
import { useState } from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { ChapterModel } from "../../../common/models/chapter.model"

export enum ChapterMode{
  registerChapter,
  registerPlan
}

interface ChapterTableProps {
  data: ChapterModel[],
  handlerOnChangeAddPlan:(capitulo:ChapterModel,checked:boolean)=> void | null,
  isLoading: boolean,
  handlerEdit(chapter: ChapterModel): void | null
  handlerDelete(id: Number): void | null
  mode: ChapterMode

}

const ChapterTable = (props: ChapterTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleDeleteClick = (id: number) => {
    props.handlerDelete(id);
  };

  const handleEditClick = (chapter: ChapterModel) => {
    props.handlerEdit(chapter)
  };

  const handlerCheckCapitulo=(capitulo:ChapterModel,e:any)=>{

    props.handlerOnChangeAddPlan(capitulo,e.target.checked)
  }
  const columnsRegister = [
    {
      title: "Nr do capítulo",
      dataIndex: "chapterNumber",
      sorter: (a: any, b: any) =>
        a.chapterNumber.localeCompare(b.chapterNumber),
    },
    {
      title: "Titulo",
      dataIndex: "title",
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
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
      onFilter: (value: any, record: ChapterModel) =>
        record.isActive === value,
      filterSearch: true,
    },

    {
      title: "Ação",
      key: "action",
      render: (record: ChapterModel) => (
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

  const columnsRegisterPlan = [
    {
      title: "Nr do capítulo",
      dataIndex: "chapterNumber",
      sorter: (a: any, b: any) =>
        a.chapterNumber.localeCompare(b.chapterNumber),
    },
    {
      title: "Titulo",
      dataIndex: "title",
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },


    {
      title: "Ação",
      key: "action",
      render: (record: ChapterModel) => (
        <div
        >
          <input type='checkbox' checked={record.selected} onChange={(e)=> handlerCheckCapitulo(record,e)}  ></input>

        </div>
      ),
      align: "center" as "center",
    },
  ];
  return (
    <Table
      className='custom-table'
      columns={props.mode == ChapterMode.registerChapter? columnsRegister:columnsRegisterPlan}
      rowKey="id"
      dataSource={props.data}
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
  )
}

export default ChapterTable