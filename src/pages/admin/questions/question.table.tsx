import { Table, Tag } from 'antd';
import { useState } from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { QuestionModel } from '../../../common/models/question.model';

interface QuestionTableProps {
  data: QuestionModel[],
  isLoading: boolean,
  handlerEdit(question: QuestionModel): void
  handlerDelete(id: Number): void
}

const QuestionTable = (props: QuestionTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleDeleteClick = (id: number) => {
    props.handlerDelete(id);
  };

  const handleEditClick = (question: QuestionModel) => {
    props.handlerEdit(question)
  };

  const columns = [
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

  return (
    <Table
      className='custom-table'
      columns={columns}
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

export default QuestionTable