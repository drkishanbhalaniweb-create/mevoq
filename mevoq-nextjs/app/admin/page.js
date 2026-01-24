import { redirect } from 'next/navigation';

export default function AdminPage() {
    // Redirect /admin to /admin/dashboard
    // If not logged in, the dashboard layout will handle the redirect to /admin/login
    redirect('/admin/dashboard');
}
