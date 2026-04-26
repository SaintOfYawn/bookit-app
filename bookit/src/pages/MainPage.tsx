import { useEffect, useState } from 'react'
import API from '../API/api'
import avatar from '../assets/avatar.png'
export default function MainPage() {

	const [searchTerm, setSearchTerm] = useState('')
	const [alllistings, setAllListings] = useState([])
	useEffect(() => {
		API.get("/listings/").then(res => setAllListings(res.data))
	}, [])
	return (
		<>
			<div className="main bg-[#0f1629] h-full">
				{/* Заголовок */}
				<section>
					{/* Текст для mobile */}
					<div className="h1 text-white md:hidden text-5xl font-bold text-center pt-40">
						<p>Book <br /> anything.<br /> <span className='text-[#f5a623]' >Instantly.</span> </p>
					</div>
					{/* Текст для desktop */}
					<div className="h1 text-white hidden md:block text-5xl font-bold text-center pt-40">
						<p>Book anything.<br /> <span className='text-[#f5a623]' >Instantly.</span> </p>
					</div>
					<div className="about mx-4 my-4">
						<p className='text-zinc-400 text-center' >Find and reserve workspaces, meeting <br /> rooms, and services in seconds. Professional spaces when you need them.</p>
					</div>
				</section>
				{/* Секция поиска */}
				<form className=''>
					<div className="bg-white/5 mx-4 rounded-xl px-4 py-2 flex flex-col md:flex-row gap-2">

						<div className="search flex mt-2">
							<input type="text" onChange={e => setSearchTerm(e.target.value)}
								value={searchTerm}
								placeholder='Location' required className='rounded-xl px-4 py-2 border-1  border-gray-600 font-semibold text-[#ced0d3] bg-[#2a3147] max-w-md w-120 h-14' />
						</div>
						<div className="date flex">
							<input type="date" className='rounded-xl px-4 py-2 border-1  border-gray-600 font-semibold text-[#ced0d3] bg-[#2a3147] max-w-md w-120 h-14' />
						</div>
						<div className="sel flex ">
							<select className='rounded-xl px-4 py-2 border-1  border-gray-600 font-semibold text-[#ced0d3] bg-[#2a3147] max-w-md w-120 h-14' name="" id="">Cotegories
								<option value="">1</option>
								<option value="">2</option>
								<option value="">3</option>
							</select>
						</div>
						<div className="buttin flex">
							<button className='rounded-xl mb-2 px-4 py-2 border-1 font-semibold text-black bg-[#f5a623] max-w-md w-120 h-14'>Fing & Book</button>
						</div>
					</div>
				</form>

				{/* Тестовая секция карточки, потом вынести */}
				<div className="hoste flex flex-col md:flex-row gap-4 mt-10 items-center justify-center">
					<div className="bg-[#1a2035] rounded-2xl overflow-hidden w-72 shadow-xl border border-white/10">
						{/* Картинка */}
						<div className="w-full h-44 overflow-hidden">
							<img src={avatar} alt="space" className="w-full h-full object-cover" />
						</div>
						{/* Контент */}
						<div className="p-4 flex flex-col gap-2">
							{/* Название */}
							<h2 className="text-white text-base font-bold leading-tight">
								Modern Co-Working Space
							</h2>
							{/* Локация */}
							<div className="flex items-center gap-1 text-[#8b93a8] text-xs">
								<span>📍</span>
								<span>Downtown Manhattan</span>
							</div>

							{/* Рейтинг */}
							<div className="flex items-center gap-1 text-xs">
								<span className="text-[#f5a623]">⭐</span>
								<span className="text-[#f5a623] font-semibold">4.9</span>
								<span className="text-[#8b93a8]">(124 reviews)</span>
							</div>

							{/* Удобства */}
							<div className="flex items-center gap-2 flex-wrap mt-1">
								{["WiFi", "Projector", "Coffee"].map((item) => (
									<div key={item}
										className="flex items-center gap-1 text-[#8b93a8] text-xs
          border border-white/10 rounded-lg px-2 py-1 bg-white/5">
										<span>{item === "WiFi" ? "📶" : item === "Projector" ? "🖥" : "☕"}</span>
										<span>{item}</span>
									</div>
								))}
							</div>

							{/* Разделитель */}
							<hr className="border-white/10 mt-1" />

							{/* Цена + кнопка */}
							<div className="flex items-center justify-between mt-1">
								<div className="text-white text-lg font-bold">
									<span className="text-[#f5a623]">$45</span>
									<span className="text-[#8b93a8] text-xs font-normal">/hour</span>
								</div>
								<button className="bg-[#f5a623] text-[#0f1629] text-sm font-bold
        px-4 py-2 rounded-xl hover:bg-[#e09610] transition active:scale-95">
									Book now
								</button>
							</div>

						</div>
					</div>
				</div>
				<div className="list">
					{alllistings.map((l) => (
						<div key={l.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center">
							<div>
								<p className="text-sm font-medium text-gray-800">{l.title}</p>
								<p className="text-xs text-gray-400">{l.city} · {l.category}</p>
							</div>
							<span className="text-sm font-semibold text-gray-700">€{l.price_per_night}</span>
						</div>
					))}
				</div>
			</div>
		</>
	)
}