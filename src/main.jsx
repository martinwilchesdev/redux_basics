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
        {store.getState()}
      </div>
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

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)