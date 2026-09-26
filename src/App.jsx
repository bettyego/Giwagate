import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Properties from './pages/Properties.jsx'
import PropertyDetail from './pages/PropertyDetail.jsx'
import Developments from './pages/Developments.jsx'
import Investment from './pages/Investment.jsx'
import Projects from './pages/Projects.jsx'
import PropertyManagement from './pages/PropertyManagement.jsx'
import ListProperty from './pages/ListProperty.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:slug" element={<PropertyDetail />} />
        <Route path="developments" element={<Developments />} />
        <Route path="investment" element={<Investment />} />
        <Route path="projects" element={<Projects />} />
        <Route path="property-management" element={<PropertyManagement />} />
        <Route path="list-property" element={<ListProperty />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
