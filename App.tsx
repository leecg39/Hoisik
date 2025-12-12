import React, { useState, useEffect } from 'react';
import { MapPin, Star, Flame, Beer, Moon, Utensils, Zap, X, Heart, Share2, ThumbsUp, Check } from 'lucide-react';
import { StatBar } from './components/StatBar';
import { Place, Category, PlaceStats, VoteState, LikedState, MyVotesState } from './types';

// Dummy Data
const placesData: Place[] = [
  {
    id: 1,
    name: "정육도",
    engName: "Jeongyukdo",
    category: "meat",
    tags: ["#프라이빗룸", "#우대갈비", "#데이트"],
    desc: "오붓한 대화가 필요할 때, 완벽한 분리 공간.",
    stats: { mood: 90, noise: 20, taste: 95 },
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    location: "합정역 5번 출구"
  },
  {
    id: 2,
    name: "깃뜰",
    engName: "Gitteul",
    category: "meat",
    tags: ["#그릴링서비스", "#깔끔함", "#북해도식"],
    desc: "직원이 직접 구워주는 깔끔하고 편안한 고기집.",
    stats: { mood: 85, noise: 40, taste: 92 },
    image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&q=80&w=800",
    location: "합정역 8번 출구"
  },
  {
    id: 3,
    name: "서교주담",
    engName: "Seogyo Judam",
    category: "vibe",
    tags: ["#감태김밥", "#통창뷰", "#한식주점"],
    desc: "카페처럼 예쁜 공간에서 즐기는 퓨전 한식.",
    stats: { mood: 98, noise: 60, taste: 88 },
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    location: "상수역 방향"
  },
  {
    id: 4,
    name: "몽주방",
    engName: "Mongjubang",
    category: "vibe",
    tags: ["#몽도리탕", "#레트로", "#안주맛집"],
    desc: "힙한 레트로 감성과 든든한 안주가 있는 곳.",
    stats: { mood: 92, noise: 70, taste: 94 },
    image: "https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&q=80&w=800",
    location: "카페거리 내"
  },
  {
    id: 5,
    name: "서울브루어리",
    engName: "Seoul Brewery",
    category: "pub",
    tags: ["#수제맥주", "#양조장", "#높은층고"],
    desc: "탁 트인 공간에서 즐기는 신선한 크래프트 비어.",
    stats: { mood: 95, noise: 50, taste: 90 },
    image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?auto=format&fit=crop&q=80&w=800",
    location: "당인리 발전소"
  },
  {
    id: 6,
    name: "우미사치",
    engName: "Umisachi",
    category: "pub",
    tags: ["#숙성회", "#고등어봉초밥", "#조용함"],
    desc: "배부를 때 딱 좋은 고퀄리티 숙성회 이자카야.",
    stats: { mood: 88, noise: 30, taste: 96 },
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
    location: "3번 출구 뒷골목"
  },
];

const categories: Category[] = [
  { id: 'all', label: '전체', icon: <Star size={14} /> },
  { id: 'meat', label: '고기/룸', icon: <Utensils size={14} /> },
  { id: 'vibe', label: '감성술집', icon: <Flame size={14} /> },
  { id: 'pub', label: '2차/맥주', icon: <Beer size={14} /> },
];

const HapjeongMobileVote: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [liked, setLiked] = useState<LikedState>({});
  
  // 투표 상태 관리 (초기값은 가상의 데이터)
  const [votes, setVotes] = useState<VoteState>({ 1: 42, 2: 28, 3: 56, 4: 31, 5: 19, 6: 24 });
  const [myVotes, setMyVotes] = useState<MyVotesState>({}); // 내가 투표했는지 여부
  const [showToast, setShowToast] = useState<string | false>(false); // 투표 완료 알림

  useEffect(() => {
    setMounted(true);
  }, []);

  // 좋아요 토글
  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // 투표 핸들러
  const handleVote = (e: React.MouseEvent, id: number, name: string) => {
    e.stopPropagation();
    if (myVotes[id]) return; // 이미 투표했으면 중단

    setVotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setMyVotes(prev => ({ ...prev, [id]: true }));
    
    // 토스트 알림 표시
    setShowToast(`${name}에 한 표를 던졌습니다!`);
    setTimeout(() => setShowToast(false), 2000);
  };

  const filteredPlaces = activeCategory === 'all' 
    ? placesData 
    : placesData.filter(place => place.category === activeCategory);

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 font-sans transition-opacity duration-700 pb-20 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Mobile Sticky Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-blue-200 shadow-lg">H</div>
          <span className="font-bold text-lg tracking-tight">Hapjeong<span className="text-blue-600">.Vote</span></span>
        </div>
        <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">
          Young 40 Pick
        </div>
      </nav>

      {/* Hero & Filters */}
      <header className="pt-8 pb-4 px-4 bg-white">
        <h1 className="text-3xl font-black mb-2 leading-tight text-slate-900">
          오늘의 회식 장소,<br />
          <span className="text-blue-600">직접 투표</span>하세요.
        </h1>
        <p className="text-slate-500 text-sm mb-6">
          MZ 감성과 40대의 품격을 모두 갖춘 합정 핫플.
        </p>

        {/* Mobile-Optimized Horizontal Scroll Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main List */}
      <main className="px-4 py-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              onClick={() => setSelectedPlace(place)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 active:scale-[0.98] transition-transform duration-200 cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative h-52 bg-slate-200">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                
                <button 
                  onClick={(e) => toggleLike(e, place.id)}
                  className="absolute top-3 right-3 p-2 bg-black/20 backdrop-blur rounded-full text-white active:scale-90 transition-transform"
                >
                  <Heart size={16} fill={liked[place.id] ? "currentColor" : "none"} className={liked[place.id] ? "text-red-500" : ""} />
                </button>

                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                  <div className="text-white">
                    <span className="text-[10px] font-bold bg-white/20 backdrop-blur px-1.5 py-0.5 rounded text-white mb-1 inline-block">
                      {place.category === 'meat' ? '고기' : place.category === 'vibe' ? '분위기' : '맥주'}
                    </span>
                    <h2 className="text-xl font-bold leading-none">{place.name}</h2>
                  </div>
                  
                  {/* Vote Count Badge on Card */}
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-white text-xs font-bold border border-white/20">
                    <ThumbsUp size={12} className="text-blue-400" />
                    <span>{votes[place.id]}표</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar">
                  {place.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-slate-600 text-sm line-clamp-2 h-10 leading-snug mb-4">
                  {place.desc}
                </p>

                {/* Vote Button Block */}
                <button
                  onClick={(e) => handleVote(e, place.id, place.name)}
                  className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                    myVotes[place.id] 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200 cursor-default'
                      : 'bg-slate-900 text-white shadow-md hover:bg-slate-800 active:scale-95'
                  }`}
                >
                  {myVotes[place.id] ? (
                    <>
                      <Check size={16} /> 투표 완료
                    </>
                  ) : (
                    <>
                      <ThumbsUp size={16} /> 여기로 가자!
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Mobile Bottom Sheet / Desktop Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedPlace(null)}
          ></div>
          
          <div className="relative bg-white w-full md:max-w-3xl rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row animate-[slideUp_0.3s_ease-out] md:animate-[fadeIn_0.3s_ease-out]">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPlace(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Image Section */}
            <div className="h-48 md:h-auto md:w-5/12 relative shrink-0">
               <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
               <div className="absolute bottom-4 left-5 text-white md:hidden">
                 <h2 className="text-2xl font-bold">{selectedPlace.name}</h2>
                 <p className="text-white/80 text-xs">{selectedPlace.engName}</p>
               </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 md:w-7/12 overflow-y-auto bg-white">
              <div className="hidden md:block mb-4">
                <h2 className="text-2xl font-black text-slate-900">{selectedPlace.name}</h2>
                <p className="text-slate-400 text-xs font-bold">{selectedPlace.engName}</p>
              </div>

              <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-sm font-bold text-slate-500">현재 득표수</div>
                <div className="text-2xl font-black text-blue-600 flex items-center gap-1">
                  {votes[selectedPlace.id]} <span className="text-sm text-slate-400 font-medium">표</span>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {selectedPlace.desc} <br/>
                <span className="text-xs text-slate-400 mt-2 block">
                  <MapPin size={12} className="inline mr-1" />{selectedPlace.location}
                </span>
              </p>

              <div className="space-y-3 mb-6">
                <StatBar label="분위기" value={selectedPlace.stats.mood} icon={<Zap size={12} />} color="bg-yellow-400" />
                <StatBar label="맛" value={selectedPlace.stats.taste} icon={<Utensils size={12} />} color="bg-red-400" />
                <StatBar label="대화" value={100 - selectedPlace.stats.noise} icon={<Moon size={12} />} color="bg-indigo-400" />
              </div>

              <div className="flex gap-2">
                 <button 
                   onClick={(e) => handleVote(e, selectedPlace.id, selectedPlace.name)}
                   className={`flex-1 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    myVotes[selectedPlace.id]
                      ? 'bg-blue-100 text-blue-700 cursor-default'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
                   }`}
                 >
                    {myVotes[selectedPlace.id] ? '투표 완료됨' : '여기로 투표하기'}
                 </button>
                 <button className="px-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600">
                    <Share2 size={18} />
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 text-sm font-bold whitespace-nowrap">
          <Check size={16} className="text-green-400" />
          {showToast}
        </div>
      </div>
    </div>
  );
};

export default HapjeongMobileVote;