import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';

// Gelişmiş validasyon şeması
const signupSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'İsim en az 3 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olabilir')
    .required('İsim alanı zorunludur'),
  
  email: yup
    .string()
    .email('Geçerli bir e-posta adresi girin')
    .required('E-posta zorunludur')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Geçerli bir e-posta adresi girin'
    ),
  
  password: yup
    .string()
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .matches(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
    .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
    .matches(/[0-9]/, 'Şifre en az bir rakam içermelidir')
    .matches(
      /[^A-Za-z0-9]/,
      'Şifre en az bir özel karakter içermelidir'
    )
    .required('Şifre zorunludur'),
  
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Şifreler eşleşmiyor')
    .required('Şifre tekrarı zorunludur'),
  
  role_id: yup
    .number()
    .required('Rol seçimi zorunludur')
    .oneOf([1, 2], 'Geçerli bir rol seçin'),
  
  store: yup.object().when('role_id', {
    is: 2, // Sadece Mağaza rolü için
    then: yup.object({
      name: yup
        .string()
        .min(3, 'Mağaza adı en az 3 karakter olmalıdır')
        .max(100, 'Mağaza adı en fazla 100 karakter olabilir')
        .required('Mağaza adı zorunludur'),
      
      phone: yup
        .string()
        .matches(
          /^(\+90|0)?\s*(\(\d{3}\)[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}|\(\d{3}\)[\s-]*\d{3}[\s-]*\d{4}|\d{3}[\s-]*\d{3}[\s-]*\d{4}|\d{3}[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2})$/,
          'Geçerli bir Türkiye telefon numarası girin'
        )
        .required('Telefon numarası zorunludur'),
      
      tax_no: yup
        .string()
        .matches(
          /^T\d{4}V\d{6}$/,
          'Vergi numarası TXXXXVXXXXXX formatında olmalıdır'
        )
        .required('Vergi numarası zorunludur'),
      
      bank_account: yup
        .string()
        .matches(
          /^TR\d{2}\s?([0-9a-zA-Z]\s?){16,24}$/,
          'Geçerli bir IBAN numarası girin'
        )
        .required('Banka hesap numarası zorunludur')
    })
  })
});

const SignupPage = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      role_id: 1 // Varsayılan olarak Müşteri seçili
    }
  });

  const selectedRoleId = watch('role_id');

  // Rolleri çek
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get('/roles');
        setRoles(response.data);
      } catch (err) {
        console.error('Roller yüklenirken hata oluştu:', err);
        setError('Roller yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    };

    fetchRoles();
  }, []);

  // Telefon numarası formatlama
  const formatPhoneNumber = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    
    // Format: (5XX) XXX-XXXX
    if (value.length > 0) {
      value = `(${value})`;
    
      if (value.length > 3) {
        value = `${value.slice(0, 4)}) ${value.slice(4)}`;
      }
      if (value.length > 9) {
        value = `${value.slice(0, 9)}-${value.slice(9)}`;
      }
    }
    
    setValue('store.phone', value);
  };

  // Vergi numarası formatlama
  const formatTaxNumber = (e) => {
    let value = e.target.value.toUpperCase();
    // Sadece büyük harf ve rakamlara izin ver
    value = value.replace(/[^0-9TtVv]/g, '');
    // Format: TXXXXVXXXXXX
    if (value.length > 0 && !value.startsWith('T')) {
      value = `T${value}`;
    }
    if (value.length > 5 && !value.includes('V') && !value.includes('v')) {
      value = `${value.slice(0, 5)}V${value.slice(5)}`;
    }
    if (value.length > 12) {
      value = value.slice(0, 12);
    }
    setValue('store.tax_no', value);
  };

  // IBAN formatlama
  const formatIban = (e) => {
    let value = e.target.value.toUpperCase();
    // Sadece büyük harf, rakam ve boşluk
    value = value.replace(/[^A-Z0-9\s]/g, '');
    // 2 karakterden sonra boşluk ekle (TR kodu için)
    if (value.length > 2 && value[2] !== ' ') {
      value = `${value.slice(0, 2)} ${value.slice(2)}`;
    }
    // 4 karakterde bir boşluk ekle
    value = value.replace(/(.{4})/g, '$1 ').trim();
    // Maksimum 29 karakter (TR + 26 karakter)
    if (value.length > 29) {
      value = value.slice(0, 29);
    }
    setValue('store.bank_account', value);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      // Eğer mağaza değilse, store objesini çıkar
      const submitData = { ...data };
      if (submitData.role_id !== 2) {
        delete submitData.store;
      }
      delete submitData.confirmPassword; // Onay şifresini göndermiyoruz

      await axiosInstance.post('/signup', submitData);
      
      // Başarılı kayıt sonrası yönlendirme
      navigate('/login', { 
        state: { 
          message: "Hesabınız başarıyla oluşturuldu. Lütfen e-postanızı kontrol edin." 
        } 
      });
    } catch (err) {
      console.error('Kayıt sırasında hata oluştu:', err);
      setError(err.response?.data?.message || 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Hesap Oluştur</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Veya{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            zaten bir hesabınız var mı? Giriş yapın
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Ad Soyad
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  {...register('name')}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta adresi
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  {...register('password')}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Şifre Tekrar
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">
                Hesap Türü
              </label>
              <select
                id="role_id"
                name="role_id"
                {...register('role_id')}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role_id && <p className="mt-1 text-sm text-red-600">{errors.role_id.message}</p>}
            </div>

            {/* Mağaza Bilgileri - Sadece Mağaza seçiliyse göster */}
            {selectedRoleId == 2 && (
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Mağaza Bilgileri</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="store.name" className="block text-sm font-medium text-gray-700">
                      Mağaza Adı
                    </label>
                    <div className="mt-1">
                      <input
                        id="store.name"
                        name="store.name"
                        type="text"
                        {...register('store.name')}
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.store?.name ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      />
                      {errors.store?.name && <p className="mt-1 text-sm text-red-600">{errors.store.name.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="store.phone" className="block text-sm font-medium text-gray-700">
                      Telefon Numarası
                    </label>
                    <div className="mt-1">
                      <input
                        id="store.phone"
                        name="store.phone"
                        type="tel"
                        placeholder="(5XX) XXX-XXXX"
                        onInput={formatPhoneNumber}
                        {...register('store.phone')}
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.store?.phone ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      />
                      {errors.store?.phone && <p className="mt-1 text-sm text-red-600">{errors.store.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="store.tax_no" className="block text-sm font-medium text-gray-700">
                      Vergi Numarası
                    </label>
                    <div className="mt-1">
                      <input
                        id="store.tax_no"
                        name="store.tax_no"
                        type="text"
                        placeholder="TXXXXVXXXXXX"
                        onInput={formatTaxNumber}
                        {...register('store.tax_no')}
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.store?.tax_no ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      />
                      {errors.store?.tax_no && <p className="mt-1 text-sm text-red-600">{errors.store.tax_no.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="store.bank_account" className="block text-sm font-medium text-gray-700">
                      IBAN Numarası
                    </label>
                    <div className="mt-1">
                      <input
                        id="store.bank_account"
                        name="store.bank_account"
                        type="text"
                        placeholder="TR XX XXXX XXXX XXXX XXXX XXXX XX"
                        onInput={formatIban}
                        {...register('store.bank_account')}
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.store?.bank_account ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      />
                      {errors.store?.bank_account && <p className="mt-1 text-sm text-red-600">{errors.store.bank_account.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;