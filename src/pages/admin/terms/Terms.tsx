import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import Nav from "../../../components/nav/nav.component";
import constParams from "../../../common/constants/constParams";
import { ParamModel } from "../../../common/models/param.model";
import { ParamService } from "../../../common/http/api/paramService";

const Terms = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const _paramService = new ParamService();
  const [paramModel, setParamModel] = useState<ParamModel>(new ParamModel());
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    setValue
  } = useForm();

  const getParam = (key: string) => {
    setIsLoading(true);

    _paramService
      .getByKey(key)
      .then((response: any) => {
        setParamModel(new ParamModel(response));
        setValue("value", response.value);
      })
      .catch((e) => {
        let message = "Error ao obter termos.";
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        console.log("Erro: ", message, e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getParam(constParams.Terms);
  }, []);

  const onSubmit = async (data: any) => {
    if (data.value.length > 0) {
      setErrorMessage('');

      if (data.value === paramModel.value)
      {
        toast.warning('Texto sem alterações!', { position: 'top-center' });
        return;
      }
    }
    else {
      setErrorMessage('Antes de prosseguir, por favor, preencha os termos.');
      return;
    }

    setIsLoading(true);

    _paramService
      .put(
        new ParamModel({
          id: paramModel.id,
          key: paramModel.key,
          value: data.value,
        }),
      )
      .then(() => {
        toast.success("Informações salvas com sucesso!", { position: 'top-center' });
      })
      .catch((e) => {
        let message = "Error ao salvar informações!";
        if (e.response?.data?.length > 0 && e.response.data[0].message) message = e.response.data[0].message;
        if (e.response?.data?.detail) message = e.response?.data?.detail;
        toast.error(message, {
          position: 'top-center',
          style: {maxWidth: 600}
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Nav />

      <main
        className="main bg-iautorpx-4 pb-4"
        style={{ minHeight: "676px" }}
      >
        <section className="container" id="title">
          <div className="row">
            <p className="mt-4 p-0 f-12">
              <span className="fw-bold">Home/ </span>Termos
            </p>
            <h1 className="mt-0 p-0">Termos</h1>
          </div>
        </section>

        <section className="container my-3" id="videos">
          <div className="row">
            <div
              className="col-none col-sm-none col-md-none col-lg-4 d-none d-lg-block"
              id="sub-menu"
              style={{ paddingLeft: "0" }}
            >
              <div
                className="d-flex justify-content-between align-items-center bg-white rounded p-3"
                style={{
                  borderRadius: "4px",
                  boxShadow: "0px 0px 4px 0px rgba(30, 47, 101, 0.25)",
                }}
              >
                <div className="d-flex align-items-center">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{
                      borderWidth: "3px",
                      borderStyle: "solid",
                      borderColor: "#4200FF",
                      borderRadius: "5px",
                      fontSize: "30px",
                    }}
                  >
                    assignment
                  </span>
                  <span className="mx-3">Termos</span>
                </div>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "35px" }}
                >
                  chevron_right
                </span>
              </div>
            </div>

            <div
              className="col-12 col-md-12 col-lg-8 bg-white rounded p-4"
              id="terms-form"
              style={{
                borderRadius: "4px",
                boxShadow: "0px 0px 4px 0px rgba(30, 47, 101, 0.25)",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-start">
                  <div className="p-3 bg-bgIcon border-0 rounded">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{
                        borderWidth: "3px",
                        borderStyle: "solid",
                        borderColor: "#4200FF",
                        borderRadius: "5px",
                      }}
                    >
                      assignment
                    </span>
                  </div>
                  <div className="mx-3">
                    <p className="m-0 p-0 fw-bold f-20">Termos</p>
                    <p className="f-16">
                      Visualize ou altere abaixo as informações do Termo.
                    </p>
                  </div>
                </div>

                <hr className="py-2" />

                <div className="row">
                  <div
                    className="col-12 col-md-12 col-lg-6"
                    style={{
                      width: "100%",
                    }}
                  >
                    <TextareaAutosize
                      {...register('value')}
                      onChange={(e) => { setValue("value", e.target.value) }}
                      placeholder="Digite aqui os termos de uso..."
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #0580fa",
                      }}
                    />
                  </div>

                  <div className='d-flex justify-content-center align-items-center'>
                    {errorMessage && <span className="text-danger f-14">{errorMessage}</span>}
                  </div>

                </div>

                <button
                  type="submit"
                  className="btn bg-IAutor mt-4 p-2 fw-bold text-body-bg"
                  disabled={isLoading}
                >
                  Salvar Informações
                  {isLoading && (
                    <span
                      className="spinner-border spinner-border-sm text-light ms-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Terms;
