import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";

const Main = () => {

  // DEFINIMOS EL STATE DONDE GURDAREMOS LA DATA
  const [data, setData] = useState([]);

  // DEFINIMOS EL STATE PARA MANIPULAR LA VENTANA MODAL DE CREAR TAREA
  const [modalCrear, setModalCrear]=useState(false);

  // DEFINIMOS EL STATE PARA MANIPULAR LA VENTANA MODAL DE EDITAR TAREA
  const [modalEditar, setModalEditar]=useState(false);

  // DEFINIMOS EL STATE PARA MANIPULAR LA VENTANA MODAL DE ELIMINAR TAREA
  const [modalEliminar, setModalEliminar]=useState(false);

  // SI MODAL ES TRUE SE ABRE LA VENTANA MODAL 
  const abrirModalCrear=()=>{
    setModalCrear(!modalCrear);
  }

  // SI MODAL EDITAR ES TRUE SE ABRE LA VENTANA MODAL 
  const abrirModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  // SI MODAL ELIMINAR ES TRUE SE ABRE LA VENTANA MODAL 
  const abrirModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  // HOOK USESTATE PARA CUANDO SELECCIONEMOS UN REGISTRO (SELECCIONAR UN DATA EN ESPECIFICO PARA LUEGO REALIZAR ALGUNA FUNCION)
  const [tareaSeleccionada, setTareaSeleccionada] = useState({
    titulo: '',
    estado: 'En Espera'
  })

  // funcion para capturar el valor del input
  const handleChange=e=>{
    // se acdestructura para acceder al name y value del input
    const {name, value} = e.target;
    // prevState Lo que contiene es el valor del estado anterior
    setTareaSeleccionada(prevState=>({
      // spread operator para hacer copia de prevState y le pasamos al name el value
      ...prevState,
      [name]: value
    }))
    console.log(tareaSeleccionada);
  }

  const TareaSeleccionada=(registro, caso)=>{
    setTareaSeleccionada(registro);
    (caso === "Editar")&&abrirModalEditar();
    (caso === "Eliminar")&&abrirModalEliminar();
  }

  // PETICION AXIOS GET
  const peticionGet=()=>{

    axios.get("http://localhost:9000/tasks/all")

    .then(response=>{
      setData(response.data)
    })

    .catch((error)=> console.log(error))
  }

  const peticionPost=async(e)=>{
    e.preventDefault()
    await axios.post("http://localhost:9000/tasks/add", tareaSeleccionada)
    .then(response=>{
        setData(data.concat(response.data))
        abrirModalCrear()
    })
    setTareaSeleccionada({titulo: '',
    estado: 'En Espera'})
  }

  const peticionPut=async()=>{

    await axios.put("http://localhost:9000/tasks/update/"+tareaSeleccionada._id, tareaSeleccionada)

    .then(()=>{
      let dataNueva=data;

      dataNueva.map(task=>{

        if(tareaSeleccionada._id===task._id){
          task.titulo=tareaSeleccionada.titulo;
          task.estado=tareaSeleccionada.estado;
        }

      })
      setData(dataNueva);
      abrirModalEditar();
    }
    )
  }

  const peticionDelete=async()=>{
    await axios.delete("http://localhost:9000/tasks/delete/"+tareaSeleccionada._id)
    .then(()=>{
      setData(data.filter(task=>task._id!==tareaSeleccionada._id));
      abrirModalEliminar();
    })
  }

  useEffect(() => {
    peticionGet()
  }, [])

  return (
    <div className="App">
      <div className="container mt-3">
        <h1>TAREAS APP SENA</h1>
        <button onClick={()=>abrirModalCrear()} className='btn btn-dark bt-sm'>Nueva</button>
        <div className="top mt-3">
          
        </div>      

        <div className="container-fluid">
          {/* OPERADOR CONDICIONAL TERNARIO DE JAVASCRIPT, RENDERIZARA SI ES VERDADERO => (?) Y SI NO => (:) */}
          {data.length > 0 ? 

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                  {data.map(task=>{
                    return(
                      <tr key={task._id}>
                        <td>{task._id}</td>
                        <th>{task.titulo}</th>
                        <th className={task.estado === 'En Espera' ? 'bg-warning' : 'bg-success'}>{task.estado}</th>
                        <th>
                            <i onClick={()=>TareaSeleccionada(task, "Eliminar")} className="fa-solid fa-trash"></i>
                            &nbsp; &nbsp; 
                            <i onClick={()=>TareaSeleccionada(task, "Editar")} className="fa-solid fa-pen-to-square"></i>
                        </th>
                    </tr>
                    )
                  })}
                </tbody>
            </table>

          : <h1>No hay tareas</h1>}
          {/* SI NO SE CUMPLE LA CONDICION (NO ES VERDADERO), RENDERIZA EL H1 */}
            
        </div>

      </div>




      {/* MODAL PARA CREAR UNA TAREA */}
      <Modal isOpen={modalCrear}>
        <ModalBody>
          <div className="form-group">
          <h3>AGREGAR TAREA</h3>
            <form onSubmit={peticionPost}>
              <br/>                         
                <label>Titulo</label>
                <input onChange={handleChange} required className="form-control" type="text" name="titulo" />
              <br/>
                <label>Estado</label>
                <select onChange={handleChange} className="form-select" name='estado'>
                  <option defaultValue={"En Espera"} value="En Espera">En Espera</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Finalizada">Finalizada</option>
                </select>
              <br/>
              <div className='flex bg-white justify-content-start'>
                <button type='submit' className="btn btn-success m-1">Insertar</button>
                <button onClick={()=>abrirModalCrear()} className="btn btn-danger m-1">Cancelar</button>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>


      <Modal isOpen={modalEditar}>
        <ModalBody>
            <div className="form-group">
            <h3>EDITAR TAREA</h3>
            <br/>
              <label>Editar Titulo</label>
              <input onChange={handleChange} value={tareaSeleccionada && tareaSeleccionada.titulo} name="titulo" className="form-control" type="text"/>
            <br/>
              <label>Editar Estado</label>
              <select onChange={handleChange} value={tareaSeleccionada && tareaSeleccionada.estado} className="form-select" name='estado'>
                  <option defaultValue={"En Espera"} value="En Espera">En Espera</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Finalizada">Finalizada</option>
              </select>
            <br/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={()=>peticionPut()}>Editar</button>
          <button className="btn btn-danger" onClick={()=>abrirModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalEliminar}>
        <ModalBody>
          <div className="form-group">
            <p>¿ESTÁS SEGURO QUE QUIERES ELIMINAR LA TAREA?</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>Confirmar</button>
          <button className="btn btn-warning" onClick={()=>abrirModalEliminar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Main;