import { Navigate } from 'react-router-dom'

const ProtecteRoute = ({children}) => {
    if(localStorage.getItem('tkn') == null){
        return<><Navigate to='/login'/> </>
      } 
  return (
    <div>{children}</div>
  )
}

export default ProtecteRoute