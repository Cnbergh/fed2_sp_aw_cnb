import {Header, Sidebar , Footer} from '../components';

function Layout() {
  return (
    <div className='container'>
        <Header />
        <Sidebar />
        <main></main>
        <Footer />
        </div>
  );
}

export default Layout;