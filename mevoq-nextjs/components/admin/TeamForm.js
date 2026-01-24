'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { createMember, updateMember } from '@/app/admin/actions/team';
import Link from 'next/link';

export default function TeamForm({ member }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState(member?.name || '');
    const [role, setRole] = useState(member?.role || '');
    const [bio, setBio] = useState(member?.bio || '');
    const [avatarUrl, setAvatarUrl] = useState(member?.avatar_url || '');
    // Expertise comes as array from DB, convert to newline string for editing
    const [expertise, setExpertise] = useState(
        member?.expertise && Array.isArray(member.expertise)
            ? member.expertise.join('\n')
            : ''
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            if (member?.id) formData.append('id', member.id);

            formData.append('name', name);
            formData.append('role', role);
            formData.append('bio', bio);
            formData.append('avatar_url', avatarUrl);
            formData.append('expertise', expertise);

            const action = member ? updateMember : createMember;

            // Invoke Server Action
            const result = await action(null, formData);

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success(member ? 'Team member updated!' : 'Team member created!');
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/team" className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        {member ? 'Edit Team Member' : 'Add Team Member'}
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/team" className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 text-gray-700">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save size={18} />}
                        <span>{member ? 'Update' : 'Save'}</span>
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6 max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Full Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. Founder, CEO"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Brief biography..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expertise (One per line)</label>
                    <textarea
                        name="expertise"
                        value={expertise}
                        onChange={(e) => setExpertise(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono text-sm"
                        placeholder="Expertise 1&#10;Expertise 2"
                    />
                    <p className="mt-1 text-xs text-gray-500">Enter each area of expertise on a new line.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                    <input
                        type="text"
                        name="avatar_url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="https://example.com/avatar.jpg"
                    />
                    <p className="mt-1 text-xs text-gray-500">Enter a direct link to an image.</p>
                </div>
            </div>
        </form>
    );
}
