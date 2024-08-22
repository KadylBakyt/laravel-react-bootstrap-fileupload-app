import { Container, Alert} from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { usePage } from '@inertiajs/inertia-react';

export default function GuestLayout({ children }) {

    const { flash } = usePage().props;

  return (
    <>
        <Header/>
            <Container className="mt-3 mb-4">
                {flash.success && (
                    <Alert key='success' variant='success'>{flash.success}</Alert>
                )}

                {flash.error && (
                    <Alert key='danger' variant='danger'>{flash.error}</Alert>
                )}
                { children }
            </Container>
        <Footer/>
    </>
  );
}
