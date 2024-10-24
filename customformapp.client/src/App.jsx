import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './services/Login';
import Register from './services/Register';
import TemplateForm from './components/TemplateForm';
import TemplateList from './components/TemplateList';
import FormFilling from './components/FormFilling';
import Navigation from './Navigation';
import { AuthProvider } from './services/AuthContext';
import './assets/App.css';

const App = () => {
    return (
        <Router>
            <AuthProvider>
            <div className="app">
                <Navigation />
                <Routes>
                    {/* Authentication Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Template Management Routes */}
                    <Route path="/create-template" element={<TemplateForm />} />
                    <Route path="/view-templates" element={<TemplateList />} />

                    {/* Form Filling Route */}
                    <Route path="/fill-form/:id" element={<FormFilling />} />
                </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
