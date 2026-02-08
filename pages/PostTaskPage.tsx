
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../App';
import { TaskStatus, Task } from '../types';

const PostTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { createTask, addNotification } = useAppState();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Design & Creative');
  const [description, setDescription] = useState('');
  const [xp, setXp] = useState(100);
  const [hours, setHours] = useState(5);
  const [locationType, setLocationType] = useState<'Remote' | 'Physical'>('Remote');
  const [locationName, setLocationName] = useState('Online');

  const handlePublish = () => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      organization: 'Partner Org',
      orgLogo: 'https://picsum.photos/id/20/100/100',
      category,
      description,
      xp,
      hours,
      deadline: 'Nov 30, 2023',
      locationType,
      locationName,
      status: TaskStatus.NEW,
      tags: [category, locationType]
    };
    createTask(newTask);
    navigate('/org-dashboard');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <h1 className="text-4xl font-black tracking-tight mb-2">Post a Mission</h1>
          


          <div className="bg-white dark:bg-card-dark p-10 rounded-[2.5rem] border border-border-light dark:border-border-dark space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Title</label>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl h-16 px-6 text-xl font-bold border-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[200px] bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 text-lg border-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div className="pt-10">
              <button onClick={handlePublish} className="w-full h-18 bg-primary text-slate-900 rounded-2xl font-black text-xl hover:scale-105 transition-all">
                Publish Mission
              </button>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 bg-slate-900 text-white rounded-[2.5rem] p-10 space-y-6">
            <h3 className="text-xl font-black">Mission Settings</h3>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</p>
              <p className="font-bold text-primary">{category}</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">XP Reward</p>
              <p className="font-bold">{xp} XP</p>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Your mission will be vetted for professional alignment before being listed in the Discovery feed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PostTaskPage;
