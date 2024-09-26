import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'

/**
 * El primer parametro es el estado en el store
 * El reducer devuelve un nuevo estado basado en el tipo de accion
*/
const counterReducer = (state = 0, action) => {
  // La declaracion switch es el enfoque mas comun al momento de escribir un reducer
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
  }

  return state
}

// El reducer nunca debe ser llamado directamente desde el codigo de la aplicacion. Solo es proporcionado como parametro de la funcion createStore
const store = createStore(counterReducer)

const App = () => {
  return(
    <div>
      <div>
        {/* Se solicita el valor del contador desde la store */}
        {store.getState()}
      </div>
      {/* Los controladores de acciones de los botones envian las acciones correctas al store */}
      <button onClick={() => store.dispatch({type: 'INCREMENT'})}>
        plus
      </button>
      <button onClick={() => store.dispatch({type: 'ZERO'})}>
        zero
      </button>
      <button onClick={() => store.dispatch({type: 'DECREMENT'})}>
        decrement
      </button>
    </div>
  )
}

// El store ahora usa el reducer para manejar acciones que son enviadas o enviadas al store con el metodo `dispatch`
store.dispatch({
  type: 'INCREMENT'
})

// El estado del store se puede averiguar mediante el metodo `getState`
console.log(store.getState())

// El tercer metodo importante que tiene el store es `subscribe`, que se utiliza para crear funciones callback que el store llama cuando cambia su estado
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

store.dispatch({
  type: 'DECREMENT'
})
store.dispatch({
  type: 'INCREMENT'
})
store.dispatch({
  type: 'ZERO'
})

const root = createRoot(document.getElementById('root'))

// Cuando se cambia el estado del store, React no puede volver a re-renderizar automaticamente la aplicacion.
const renderApp = () => {
  root.render(<App />)
}

// Se renderiza por primera vez la aplicacion
renderApp()

// Se registra la funcion que renderiza toda la aplicacion para escuchar cambios en el store con el metodo `store.subscribe`
store.subscribe(renderApp)