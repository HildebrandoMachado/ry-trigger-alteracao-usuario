import { getAuth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';
import { document } from 'firebase-functions/v1/firestore';

const auth = getAuth(initializeApp());

export const trigger_alteracao_email_usuario = document('usuarios/{usuarioId}').onUpdate(async (usuario, _context) => {
    if (usuario.before && usuario.after) {
        if ((!usuario.before.get('email')) && usuario.after.get('email')) {
            await auth.createUser({
                emailVerified: false,
                password: 'Akkds@17986#-FYd',
                email: usuario.after.get('email')
            });
        } else {
            if (usuario.before.get('email') && usuario.after.get('email') && (usuario.before.get('email') !== usuario.after.get('email'))) {
                await auth.updateUser(usuario.after.id, { email: usuario.after.get('email') });
            }
        }
    }
    return true;
});