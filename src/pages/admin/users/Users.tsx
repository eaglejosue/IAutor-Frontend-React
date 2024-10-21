import { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Table, Tag } from 'antd';

import { UserService } from '../../../common/http/api/userService';
import { UserModel } from '../../../common/models/user.model';
import { UserFilter } from '../../../common/models/filters/user.filter';
import Nav from '../../../components/nav/nav.component';
import SearchInput from '../../../components/forms/searchInput/searchInput';
import CustomButton from '../../../components/forms/customButton/customButton';
import UserForm from './user.component';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isExitConfirmationModalOpen, setIsExitConfirmationModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const _userService = new UserService();
  const [users, setUsers] = useState<UserModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserModel>(new UserModel());
  const [inactivationModalOpen, setInactivationModalOpen] = useState(false);
  const [idToInactivate, setIdToInactivate] = useState(0);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = (filter?: UserFilter) => {
    setIsLoading(true);
    _userService.getAll(filter ?? new UserFilter())
      .then((response: any) => {
        setUsers(response?.length ? response : []);
      })
      .catch((e) => {
        let message = 'Error ao obter usuários.';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log('Erro: ', message, e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearchClick = () => {
    getUsers(new UserFilter({
      filter: searchTerm
    }));
  };

  const handleEditClick = (user: UserModel) => {
    setSelectedUser(user);
    setIsFormModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedUser(new UserModel());
    setIsFormModalOpen(true);
  };

  const handleCloseModal = (c: boolean = true) => {
    if (c) setIsExitConfirmationModalOpen(true);
    else handleExitConfirm();
  };

  const handleExitConfirm = () => {
    setIsFormModalOpen(false);
    setSelectedUser(new UserModel());
    getUsers();
    setIsExitConfirmationModalOpen(false);
  };

  const handleExitCancel = () => {
    setIsExitConfirmationModalOpen(false);
  };

  const handleDeleteClick = (id: number) => {
    setIdToInactivate(id);
    setInactivationModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setInactivationModalOpen(false);
    setIdToInactivate(0);
  };

  const handleDeleteConfirm = async () => {
    if (idToInactivate === 0) return;

    setIsLoading(true);
    _userService.delete(idToInactivate)
      .then(() => {
        getUsers();
        setInactivationModalOpen(false);
        setIdToInactivate(0);
      })
      .catch((e) => {
        let message = 'Error ao deletar usuário.';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log('Erro: ', message, e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const columns = [
    {
      title: '',
      dataIndex: 'profileImgUrl',
      align: 'center' as 'center',
      render: (_: any, record: UserModel) => record.profileImgUrl &&
        <img src={record.profileImgUrl} alt={record.fullname} className="rounded-circle"
          style={{ width: '45px', height: '45px', objectFit: 'cover' }}
        />
    },
    {
      title: 'Nome',
      dataIndex: 'fullname',
      sorter: (a: any, b: any) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
    },
    {
      title: 'Login',
      dataIndex: 'signInWith',
      render: (signInWith: string) => (
        <Tag color={signInWith === 'Google' ? 'purple' : 'green'}>{signInWith === 'Google' ? 'Google' : 'Padrão'}</Tag>
      ),
      filters: [
        { text: 'Padrão', value: 'Default' },
        { text: 'Google', value: 'Google' },
      ],
      onFilter: (value: any, record: UserModel) => record.signInWith === value,
      filterSearch: true,
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      render: (type: string) => (
        <Tag color={type === 'Default' ? 'blue' : type === 'Admin' ? 'red' : type === 'Operator' ? 'geekblue' : type === 'Influencer' ? 'volcano' : 'green'}>
          {type === 'Default' ? 'Comum' : type === 'Admin' ? 'Administrador' : type === 'Operator' ? 'Operador' : type === 'Influencer' ? 'Influencer' : 'Agente'}
        </Tag>
      ),
      filters: [
        { text: 'Comum', value: 'Default' },
        { text: 'Administrador', value: 'Admin' },
        { text: 'Operador', value: 'Operator' },
        { text: 'Influencer', value: 'Influencer' },
        { text: 'Agente', value: 'Agent' },
      ],
      onFilter: (value: any, record: UserModel) => record.type === value,
      filterSearch: true,
    },
    {
      title: 'Data de nascimento',
      dataIndex: 'birthDate',
      render: (birthDate: string) => birthDate ? format(new Date(birthDate), 'dd/MM/yyyy', { locale: pt }) : 'N/A',
      align: 'center' as 'center',
      sorter: (a: any, b: any) => a.birthDate.localeCompare(b.birthDate),
    },
    {
      title: 'Data cadastro',
      dataIndex: 'createdAt',
      render: (createdAt: string) => createdAt ? format(new Date(createdAt), 'dd/MM/yyyy', { locale: pt }) : 'N/A',
      align: 'center' as 'center',
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
      title: 'Data alteração',
      dataIndex: 'updatedAt',
      render: (updatedAt: string) => updatedAt ? format(new Date(updatedAt), 'dd/MM/yyyy', { locale: pt }) : 'N/A',
      align: 'center' as 'center',
      sorter: (a: any, b: any) => a.updatedAt.localeCompare(b.updatedAt),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'geekblue' : 'red'}>{isActive ? 'Ativo' : 'Inativo'}</Tag>
      ),
      align: 'center' as 'center',
      filters: [
        { text: 'Ativo', value: true },
        { text: 'Inativo', value: false },
      ],
      onFilter: (value: any, record: UserModel) => record.isActive === value,
      filterSearch: true,
    },
    {
      title: 'Ação',
      key: 'action',
      render: (record: UserModel) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <span className="material-symbols-outlined"
            onClick={() => handleEditClick(record)}
            style={{ cursor: 'pointer', fontSize: '20px', marginRight: '0.3rem' }}
            title='Editar'
          >
            edit
          </span>
          {record.isActive &&
            <span className="material-symbols-outlined"
              onClick={() => handleDeleteClick(record.id)}
              style={{ cursor: 'pointer', fontSize: '20px' }}
              title='Deletar'
            >
              delete
            </span>
          }
        </div>
      ),
      align: 'center' as 'center',
    },
  ];

  return (
    <>
      <Nav />

      <main className='main bg-iautor pb-4' style={{ minHeight: '676px', flex: 1 }}>
        <section className='container' id='title'>
          <div className='row'>
            <p className='mt-4 p-0 f-12'>
              <span className='fw-bold'>Home/ </span>Usuários
            </p>
            <h1 className='mt-0 p-0'>Usuários</h1>
          </div>
        </section>

        <section className='container border-top' id='filter'>
          <div className='row my-4'>
            <div className='col-8 col-md-3 col-sm-6' style={{ paddingLeft: '0' }}>
              <SearchInput
                placeholder="Buscar Usuário"
                onChange={e => setSearchTerm(e)}
                onEnter={handleSearchClick}
              />
            </div>
            <div className='col-auto me-auto'>
              <CustomButton
                onClick={handleSearchClick}
                disabled={isLoading}
              />
            </div>
            <div className='col-auto' style={{ paddingRight: '0' }}>
              <CustomButton
                onClick={handleAddClick}
                disabled={isLoading}
                text='Novo'
                materialText='add'
              />
            </div>
          </div>
        </section>

        <section className='container mt-3 px-0' id='table-perfis'>
          <Table
            className='custom-table'
            columns={columns}
            rowKey="id"
            dataSource={users}
            locale={{ emptyText: 'Nenhum dado disponível.' }}
            loading={isLoading}
            pagination={{
              current: currentPage,
              pageSize: itemsPerPage,
              total: users.length,
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
        </section>

        <Modal show={isFormModalOpen} onHide={() => handleCloseModal()} centered size='lg' backdrop="static">
          <Modal.Header closeButton className="bg-white border-0">
            <Modal.Title>{selectedUser.id == null ? 'Criar usuário' : 'Editar usuário'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white">
            <UserForm user={selectedUser} handleClose={(c) => handleCloseModal(c)} />
          </Modal.Body>
        </Modal>

        <Modal show={inactivationModalOpen} onHide={() => setInactivationModalOpen(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Inativação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Você tem certeza que deseja inativar este usuário?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn border-1 rounded-5 f-14 px-4 py-2"
              style={{ border: '1px solid #dee2e6' }}
              onClick={handleDeleteCancel}>
              Não
            </button>
            <button
              className="btn btn-primary text-white rounded-5 f-14 px-4 py-2"
              onClick={handleDeleteConfirm}>
              Sim
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={isExitConfirmationModalOpen} onHide={() => setIsExitConfirmationModalOpen(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Saída</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p className='mb-1'>Você tem certeza que deseja sair?</p>
            <p className='mb-1'>Todas as alterações não salvas serão perdidas.</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn border-1 rounded-5 f-14 px-4 py-2"
              style={{ border: '1px solid #dee2e6' }}
              onClick={handleExitCancel}>
              Não
            </button>
            <button
              className="btn btn-primary text-white rounded-5 f-14 px-4 py-2"
              onClick={handleExitConfirm}>
              Sim
            </button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
};

export default Users;
