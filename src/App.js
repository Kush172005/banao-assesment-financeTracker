import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"
import Dashboard from "./components/Dashboard"
import TransactionManagement from "./components/TransactionManagement"
import BudgetGoals from "./components/BudgetGoals"
import Navbar from "./components/Navbar"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionManagement />} />
              <Route path="/budget" element={<BudgetGoals />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App

