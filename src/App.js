import React, { Component } from 'react';
import '../src/bootstrap.min.css';
import Header from '../src/components/Header';
import NuevaCita from '../src/components/NuevaCita';
import ListaCitas from '../src/components/ListaCitas';

class App extends Component {
  
  state = {
    citas : []

  }


//Cuando la aplicacion carga
  componentDidMount(){

    const citasLS = localStorage.getItem('citas');
    if(citasLS){
      this.setState({
        citas : JSON.parse(citasLS)
      })
    }

  }

  // Cuando eliminamos o agregamos una  nueva cita
  componentDidUpdate(){

    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  crearNuevaCita = datos => {
    // Copiar el state actual
    const citas = [...this.state.citas, datos];
    // Agregar el nuevo state
    this.setState({
      citas
    });
  }

  //Eliminar Citas del State
  eliminarCita = id => {
    //Tomar copia del state
    const citasActuales = [...this.state.citas];

    //utilizar filter para sacar el elemento @id del arreglo
    const citas = citasActuales.filter(cita => cita.id !== id);

    //Actualizar el state
    this.setState({
      citas
    })
  }

  render() {

    return (

      <div className="container">
          <Header
            titulo='Administrador Clientes Veterinaria'
          />

          <div className="row">
            <div className="col-md-10 mx-auto">
              <NuevaCita 
                crearNuevaCita={this.crearNuevaCita}
              />
            </div>
            <div className="mt-5 col-md-10 mx-auto">
                <ListaCitas
                  citas = {this.state.citas}
                  eliminarCita={this.eliminarCita}
                />
            </div>
          </div>
      </div>
     );
  }
}

export default App;
