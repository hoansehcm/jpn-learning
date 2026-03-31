'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'motion/react';
import { User, Target, Flame, CalendarDays, Save, LogOut } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Profile() {
  const { user, userProfile, logout } = useAuth();
  
  const [targetLevel, setTargetLevel] = useState(userProfile?.targetLevel || 'N5');
  const [dailyGoal, setDailyGoal] = useState(userProfile?.dailyGoal || 20);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        targetLevel,
        dailyGoal: Number(dailyGoal)
      });
      setSaveMessage('Lưu cài đặt thành công!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage('Có lỗi xảy ra khi lưu.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!userProfile) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Hồ sơ cá nhân</h1>
          <p className="text-slate-600">Quản lý thông tin và mục tiêu học tập của bạn.</p>
        </div>

        <div className="space-y-6">
          
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
              {userProfile.photoURL ? (
                <img src={userProfile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-10 h-10 text-indigo-600" />
              )}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{userProfile.displayName}</h2>
              <p className="text-slate-500 mb-4">{userProfile.email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold flex items-center gap-1">
                  <Target className="w-4 h-4" /> Mục tiêu: {userProfile.targetLevel}
                </span>
                <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-lg text-sm font-bold flex items-center gap-1">
                  <Flame className="w-4 h-4" /> Chuỗi: {userProfile.streak} ngày
                </span>
              </div>
            </div>
            <button 
              onClick={logout}
              className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" /> Đăng xuất
            </button>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-indigo-600" /> Cài đặt học tập
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mục tiêu JLPT</label>
                <div className="grid grid-cols-5 gap-2">
                  {['N5', 'N4', 'N3', 'N2', 'N1'].map(level => (
                    <button
                      key={level}
                      onClick={() => setTargetLevel(level)}
                      className={`py-3 rounded-xl font-bold transition-all ${
                        targetLevel === level 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mục tiêu từ vựng mỗi ngày</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="5" 
                    max="100" 
                    step="5"
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <span className="w-16 text-center font-bold text-xl text-indigo-600 bg-indigo-50 py-2 rounded-xl">
                    {dailyGoal}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className={`text-sm font-medium ${saveMessage.includes('lỗi') ? 'text-red-500' : 'text-emerald-500'}`}>
                  {saveMessage}
                </span>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md shadow-indigo-200 disabled:opacity-70"
                >
                  <Save className="w-5 h-5" /> {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
