// frontend/src/pages/ProfilePage.tsx
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Select } from '../components/UI/Select';

export const ProfilePage: React.FC = () => {
  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => api.getUserProfile(),
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    region: '',
    district: '',
    business_type: '',
    business_name: '',
  });
  
  const updateMutation = useMutation({
    mutationFn: (data: any) => api.updateProfile(data),
    onSuccess: () => {
      setIsEditing(false);
      refetch();
    },
  });
  
  const regions = [
    'Toshkent', 'Farg‘ona', 'Samarqand', 'Qashqadaryo', 'Andijon',
    'Buxoro', 'Navoiy', 'Jizzax', 'Surxondaryo', 'Xorazm', 'Namangan',
    'Sirdaryo', 'Qoraqalpog‘iston'
  ];
  
  const businessTypes = [
    'Savdo', 'Xizmat ko‘rsatish', 'Ishlab chiqarish', 'Qishloq xo‘jaligi',
    'IT va texnologiyalar', 'Turizm', 'Qurilish', 'Transport', 'Boshqa'
  ];
  
  if (isLoading) {
    return <div className="flex justify-center py-12">Yuklanmoqda...</div>;
  }
  
  const handleSave = () => {
    updateMutation.mutate(formData);
  };
  
  return (
    <div className="profile-page max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profil</h1>
          <p className="text-gray-600 mt-1">
            Shaxsiy ma’lumotlaringizni boshqaring
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => {
            setFormData(user);
            setIsEditing(true);
          }}>
            Tahrirlash
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleSave} loading={updateMutation.isPending}>
              Saqlash
            </Button>
          </div>
        )}
      </div>
      
      {/* Premium Badge */}
      {user?.is_premium && (
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <div>
              <h3 className="font-semibold text-yellow-800">Premium a'zo</h3>
              <p className="text-sm text-yellow-700">
                {user.premium_until 
                  ? `${new Date(user.premium_until).toLocaleDateString()} gacha amal qiladi`
                  : 'Cheksiz premium'
                }
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Profile Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To‘liq ism
            </label>
            {isEditing ? (
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ism familiya"
              />
            ) : (
              <p className="text-gray-900">{user?.name || '-'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <p className="text-gray-900">{user?.phone}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            {isEditing ? (
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            ) : (
              <p className="text-gray-900">{user?.email || '-'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Viloyat
            </label>
            {isEditing ? (
              <Select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                options={regions.map(r => ({ value: r, label: r }))}
              />
            ) : (
              <p className="text-gray-900">{user?.region || '-'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tuman/Shahar
            </label>
            {isEditing ? (
              <Input
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="Tuman yoki shahar"
              />
            ) : (
              <p className="text-gray-900">{user?.district || '-'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biznes turi
            </label>
            {isEditing ? (
              <Select
                value={formData.business_type}
                onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                options={businessTypes.map(t => ({ value: t, label: t }))}
              />
            ) : (
              <p className="text-gray-900">{user?.business_type || '-'}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biznes nomi
            </label>
            {isEditing ? (
              <Input
                value={formData.business_name}
                onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                placeholder="Biznes nomi"
              />
            ) : (
              <p className="text-gray-900">{user?.business_name || '-'}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{user?.stats?.grants_applied || 0}</div>
          <div className="text-sm text-gray-600">Ariza topshirilgan grantlar</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{user?.stats?.grants_won || 0}</div>
          <div className="text-sm text-gray-600">Yutilgan grantlar</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{user?.stats?.mentor_sessions || 0}</div>
          <div className="text-sm text-gray-600">Mentorlik sessiyalari</div>
        </div>
      </div>
    </div>
  );
};