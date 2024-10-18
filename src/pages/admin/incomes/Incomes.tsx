import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
import { Table, Tag } from 'antd';
import { Bar } from 'react-chartjs-2';
import ChartJS from 'chart.js/auto';

import { AuthenticatedUserModel } from '../../../common/models/authenticated.model';
import { IncomeService } from '../../../common/http/api/incomeService';
import { IncomeGroupedByDayModel } from '../../../common/models/incomeGroupedByDay.model';
import { IncomeGroupedFilter } from '../../../common/models/filters/income-grouped.filter';
import { handleMoneyChange } from '../../../components/forms/customInput/masks';

import Nav from '../../../components/nav/nav.component';
import CustomButton from '../../../components/forms/customButton/customButton';
import DropdownSelect from '../../../components/forms/dropdownSelect/dropdownSelect';
import IAutorFavIcon from '../../../assets/img/favicon-92x92.png';
import Spinners from '../../../assets/svg/SvgSpinners180Ring.svg';
import SearchInput from '../../../components/forms/searchInput/searchInput';

const Incomes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const _incomeService = new IncomeService();
  const [incomesGrouped, setIncomesGrouped] = useState<IncomeGroupedByDayModel[]>([]);
  const [qtdDays, setQtdDays] = useState('7');
  const [searchTerm, setSearchTerm] = useState('');

  const user = AuthenticatedUserModel.fromLocalStorage();
  const [valueTotal, setValueTotal] = useState('');
  const [valueIugu, setValueIugu] = useState('');

  const [col1Title, setCol1Title] = useState('');
  const [col2Title, setCol2Title] = useState('');
  const [col3Title, setCol3Title] = useState('');
  const [col4Title, setCol4Title] = useState('');
  const [col5Title, setCol5Title] = useState('');
  const [col6Title, setCol6Title] = useState('');
  const [col7Title, setCol7Title] = useState('');

  const [chartData, setChartData] = useState<{
    labels: string[],
    datasets: { label: string, data: number[], backgroundColor: string, borderColor: string, borderWidth: number }[]
  }>({
    labels: [],
    datasets: [{
      label: user?.firstname ?? 'Data',
      data: [],
      backgroundColor: 'rgba(173, 0, 255, 1)',
      borderColor: '',
      borderWidth: 1,
    }]
  });

  useEffect(() => {
    getIncomes(new IncomeGroupedFilter({ ownerId: user?.ownerId }));
    ChartJS.register();
  }, []);

  const getIncomes = (filter?: IncomeGroupedFilter) => {
    setIsLoading(true);
    _incomeService
      .getGroupedByDay(filter ?? new IncomeGroupedFilter({
        ownerId: user?.ownerId ?? 1,
        filter: searchTerm,
        qtdDays: qtdDays
      }))
      .then((response: any) => {
        if (!response) return;

        setIncomesGrouped(response);

        if (response.length < 2) return;

        let refItem = new IncomeGroupedByDayModel(response[1]);
        setValueTotal(handleMoneyChange(refItem.total));
        setValueIugu(refItem.iuguBalance);

        setCol1Title(refItem.dates[0]);
        setCol2Title(refItem.dates[1]);
        setCol3Title(refItem.dates[2]);
        setCol4Title(refItem.dates[3]);
        setCol5Title(refItem.dates[4]);
        setCol6Title(refItem.dates[5]);
        setCol7Title(refItem.dates[6]);

        setChartData({
          labels: [refItem.dates[0], refItem.dates[1], refItem.dates[2], refItem.dates[3], refItem.dates[4], refItem.dates[5], refItem.dates[6]],
          datasets: [{
            label: refItem.ownerName,
            data: [refItem.values[0], refItem.values[1], refItem.values[2], refItem.values[3], refItem.values[4], refItem.values[5], refItem.values[6]],
            backgroundColor: 'rgba(173, 0, 255, 1)',
            borderColor: '',
            borderWidth: 1,
          }]
        });
      })
      .catch((e) => {
        console.log('Erro: ', e);
        let message = 'Error ao obter dados.';
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        toast.error(message, {
          position: 'top-center',
          style: { maxWidth: 600 }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearchClick = () => {
    getIncomes();
  };

  const options = [
    { label: 'Últimos 7 dias', value: '7' },
  ];

  const columns = [
    {
      title: '',
      dataIndex: 'ownerProfileImgUrl',
      align: 'center' as 'center',
      render: (_: any, i: IncomeGroupedByDayModel) => i?.valueAcomulated ? '' :
        (i?.ownerProfileImgUrl ?
          <img src={i.ownerProfileImgUrl} className="rounded-circle"
            style={{ width: '45px', height: '45px', objectFit: 'cover' }}
          /> :
          (i?.ownerId === 1 ?
            <img src={IAutorFavIcon} className="rounded-circle"
              style={{ width: '45px', height: '45px', objectFit: 'cover' }}
            /> :
            (i?.ownerId > 1 &&
              <div className='d-flex justify-content-center'>
                <div className="rounded-circle bg-light d-flex justify-content-center align-items-center"
                  style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                >
                  <span className="material-symbols-outlined f-16" style={{ color: '#6c63ff' }}>
                    person
                  </span>
                </div>
              </div>
            )
          )
        )
    },
    {
      title: 'Conta',
      dataIndex: 'account',
      render: (_: any, i: IncomeGroupedByDayModel) => i?.ownerId === 0 ?
        `Volume de Venda${(i.valueAcomulated ? ' - Acumulado' : '')}` :
        `${i.ownerName}${(i.valueAcomulated ? ' - Acumulado' : '')}`,
      align: 'left' as 'left'
    },
    {
      title: 'Tipo',
      dataIndex: 'ownerType',
      align: 'left' as 'left',
      render: (ownerType: string) => (
        <Tag color={ownerType === 'Influencer' ? 'volcano' : ownerType === 'Agent' ? 'green' : 'blue'}>
          {ownerType === 'Influencer' ? 'Influencer' : ownerType === 'Agent' ? 'Agente' : 'Principal'}
        </Tag>
      ),
      filters: [
        { text: 'Influencer', value: 'Influencer' },
        { text: 'Agente', value: 'Agent' },
      ],
      onFilter: (value: any, i: IncomeGroupedByDayModel) => i.ownerType === value,
      filterSearch: true,
    },
    {
      title: col1Title,
      dataIndex: 'sumValue1',
      render: (_: any, i: IncomeGroupedByDayModel) => i.ownerId == 0 ? i.qtdValues[0] : i.valueIsMoney ? handleMoneyChange(i.values[0]) : i.values[0],
      align: 'center' as 'center'
    },
    {
      title: col2Title,
      dataIndex: 'sumValue2',
      render: (_: any, i: IncomeGroupedByDayModel) => i.ownerId == 0 ? i.qtdValues[1] : i.valueIsMoney ? handleMoneyChange(i.values[1]) : i.values[1],
      align: 'center' as 'center'
    },
    {
      title: col3Title,
      dataIndex: 'sumValue3',
      render: (_: any, i: IncomeGroupedByDayModel) => i.ownerId == 0 ? i.qtdValues[2] : i.valueIsMoney ? handleMoneyChange(i.values[2]) : i.values[2],
      align: 'center' as 'center'
    },
    {
      title: col4Title,
      dataIndex: 'sumValue4',
      render: (_: any, i: IncomeGroupedByDayModel) => i.ownerId == 0 ? i.qtdValues[3] : i.valueIsMoney ? handleMoneyChange(i.values[3]) : i.values[3],
      align: 'center' as 'center'
    },
    {
      title: col5Title,
      dataIndex: 'sumValue5',
      render: (_: any, i: IncomeGroupedByDayModel) => i.ownerId == 0 ? i.qtdValues[4] : i.valueIsMoney ? handleMoneyChange(i.values[4]) : i.values[4],
      align: 'center' as 'center'
    },
    {
      title: col6Title,
      dataIndex: 'sumValue6',
      render: (_: any, i: IncomeGroupedByDayModel) => i.ownerId == 0 ? i.qtdValues[5] : i.valueIsMoney ? handleMoneyChange(i.values[5]) : i.values[5],
      align: 'center' as 'center'
    },
    {
      title: col7Title,
      dataIndex: 'sumValue7',
      render: (_: any, i: IncomeGroupedByDayModel) => i.ownerId == 0 ? i.qtdValues[6] : i.valueIsMoney ? handleMoneyChange(i.values[6]) : i.values[6],
      align: 'center' as 'center'
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (_: any, i: IncomeGroupedByDayModel) => <Tag color='purple'>{i.ownerId == 0 ? i.qtdTotal : i.valueIsMoney ? handleMoneyChange(i.total) : i.total}</Tag>,
      align: 'center' as 'center'
    },
    // {
    //   title: 'Saldo',
    //   dataIndex: 'amount',
    //   render: (_: any, i: IncomeGroupedByDayModel) => i.ownerId > 0 && <Tag color='green'>{i.iuguBalance}</Tag>,
    //   align: 'center' as 'center'
    // }
  ];

  return (
    <>
      <Nav />

      <main className='main bg-iautor pb-4' style={{ minHeight: '676px', flex: 1 }}>
        <section className='container' id='title'>
          <div className='row'>
            <p className='mt-4 p-0 f-12'>
              <span className='fw-bold'>Home/ </span>Faturamento
            </p>
            <h1 className='mt-0 p-0'>Faturamento</h1>
          </div>
        </section>

        <section className='container border-top px-0' id='chart'>
          <div className='row my-4'>
            {isLoading ?
              (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                  <img src={Spinners} style={{ width: '50px', height: '50px' }} alt="Loading spinner" />
                </div>
              ) :
              (
                <>
                  <div className='col-2 col-xl-2 pt-2 my-4'>
                    <Card>
                      <Card.Body className='text-center'>
                        <h4 className='text-muted mt-2'>Total</h4>
                        <h2 className='text-muted mt-2'>{valueTotal}</h2>
                        <Tag color='purple' className='mt-2 p-2'>Total no Período</Tag>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-2 col-xl-2 pt-2 my-4'>
                    <Card>
                      <Card.Body className='text-center'>
                        <h4 className='text-muted mt-2'>Saldo</h4>
                        <h2 className='text-muted mt-2'>{valueIugu}</h2>
                        <Tag color='green' className='mt-2 p-2'>Saldo na Iugu</Tag>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className='col-8 mb-4'>
                    <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
                  </div>
                </>
              )
            }
          </div>
        </section>

        <section className='container' id='subtitle'>
          <div className='row'>
            <p key='subtitle' className='p-title mt-4 p-0'>Valores por dia</p>
            <div key='border' className='d-flex flex-sm-row border-top'></div>
          </div>
        </section>

        <section className='container' id='filter'>
          <div className='row mt-3'>
            <div className='col-8 col-md-3 col-sm-6' style={{ paddingLeft: '0' }}>
              <SearchInput
                placeholder="Buscar Conta"
                onChange={e => setSearchTerm(e)}
                onEnter={handleSearchClick}
              />
            </div>
            <div className='col-auto me-auto'>
              <CustomButton
                disabled={isLoading}
                onClick={handleSearchClick}
              />
            </div>
            <div className='col-auto' style={{ paddingRight: '0' }}>
              <DropdownSelect
                options={options}
                placeholder="Período"
                disabled={isLoading}
                startValue={options[0].value}
                onChange={(e) => setQtdDays(e)}
              />
            </div>
          </div>
        </section>

        <section className='container mt-3 px-0' id='table'>
          <Table
            columns={columns}
            rowKey="id"
            dataSource={incomesGrouped}
            locale={{ emptyText: 'Nenhum dado disponível.' }}
            loading={isLoading}
            pagination={{
              current: currentPage,
              pageSize: itemsPerPage,
              total: incomesGrouped.length,
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
      </main>
    </>
  );
};

export default Incomes;