import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../layouts/Dashboard';

const AppRouter = () => {
  return (
     <Router>
          <Routes>
                    <Route path='/dashboard' element={<Dashboard/>} >
                          <Route index element={<h1>Dashboard</h1>} />
                          <Route path="users/add" element={<h1>End user</h1>}/>
                    </Route>
          </Routes>
     </Router>
  )
}

export default AppRouter