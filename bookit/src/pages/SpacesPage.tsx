import { useState } from 'react'

interface Space {
	id: number
	name: string
	location: string
	rating: number
	reviews: number
	amenities: string[]
	pricePerHour: number
	imageUrl: string
}

const spacesData: Space[] = [
	{
		id: 1,
		name: 'Modern Co-Working Space',
		location: 'Downtown Manhattan',
		rating: 4.9,
		reviews: 124,
		amenities: ['WiFi', 'Projector', 'Coffee'],
		pricePerHour: 45,
		imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
	},
	{
		id: 2,
		name: 'Executive Meeting Room',
		location: 'Financial District',
		rating: 4.8,
		reviews: 89,
		amenities: ['WiFi', 'Projector', 'Coffee'],
		pricePerHour: 85,
		imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80',
	},
	{
		id: 3,
		name: 'Creative Studio Space',
		location: 'Brooklyn',
		rating: 4.7,
		reviews: 56,
		amenities: ['WiFi', 'Whiteboard', 'Coffee'],
		pricePerHour: 35,
		imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
	},
	{
		id: 4,
		name: 'Private Office Suite',
		location: 'Midtown',
		rating: 4.9,
		reviews: 201,
		amenities: ['WiFi', 'Parking', 'Kitchen'],
		pricePerHour: 120,
		imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80',
	},
	{
		id: 5,
		name: 'Tech Hub Workspace',
		location: 'SoHo',
		rating: 4.6,
		reviews: 73,
		amenities: ['WiFi', 'Projector', 'Kitchen'],
		pricePerHour: 55,
		imageUrl: 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=600&q=80',
	},
	{
		id: 6,
		name: 'Quiet Focus Room',
		location: 'Upper East Side',
		rating: 4.8,
		reviews: 42,
		amenities: ['WiFi', 'Coffee', 'Whiteboard'],
		pricePerHour: 30,
		imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
	},
]

const amenityIcons: Record<string, string> = {
	WiFi: '📶',
	Projector: '🖥️',
	Coffee: '☕',
	Whiteboard: '📋',
	Parking: '🅿️',
	Kitchen: '🍳',
}

export default function SpacesPage() {
	const [priceRange, setPriceRange] = useState(200)
	const [capacity, setCapacity] = useState('')
	const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [viewMode, setViewMode] = useState<'list' | 'map'>('list')

	const amenitiesList = ['WiFi', 'Projector', 'Coffee', 'Whiteboard', 'Parking', 'Kitchen']

	function toggleAmenity(amenity: string) {
		setSelectedAmenities((prev) =>
			prev.includes(amenity)
				? prev.filter((a) => a !== amenity)
				: [...prev, amenity]
		)
	}

	function resetFilters() {
		setPriceRange(200)
		setCapacity('')
		setSelectedAmenities([])
		setSearchTerm('')
	}

	const filtered = spacesData.filter((space) => {
		if (space.pricePerHour > priceRange) return false
		if (searchTerm && !space.name.toLowerCase().includes(searchTerm.toLowerCase()) && !space.location.toLowerCase().includes(searchTerm.toLowerCase())) return false
		if (selectedAmenities.length > 0 && !selectedAmenities.every((a) => space.amenities.includes(a))) return false
		return true
	})

	return (
		<div className="min-h-screen bg-[#0f1629]">
			{/* Page header */}
			<div className="px-6 pt-8 pb-4 md:px-12">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-white text-3xl font-bold">Available Spaces</h1>
						<p className="text-zinc-400 text-sm mt-1">{filtered.length} spaces found</p>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={() => setViewMode('list')}
							className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-[#f5a623] text-[#0f1629]' : 'bg-[#1a2035] text-zinc-400 border border-white/10'}`}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
						<button
							onClick={() => setViewMode('map')}
							className={`p-2 rounded-lg transition ${viewMode === 'map' ? 'bg-[#f5a623] text-[#0f1629]' : 'bg-[#1a2035] text-zinc-400 border border-white/10'}`}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="flex flex-col md:flex-row gap-6 px-6 pb-12 md:px-12">
				{/* Filters sidebar */}
				<div className="w-full md:w-72 shrink-0">
					<div className="bg-[#1a2035] rounded-2xl border border-white/10 p-6">
						<div className="flex items-center gap-2 mb-6">
							<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
							</svg>
							<h2 className="text-white text-lg font-semibold">Filters</h2>
						</div>

						{/* Price Range */}
						<div className="mb-6">
							<label className="text-white text-sm font-semibold block mb-3">Price Range</label>
							<input
								type="range"
								min={0}
								max={200}
								value={priceRange}
								onChange={(e) => setPriceRange(Number(e.target.value))}
								className="w-full accent-[#f5a623]"
							/>
							<div className="flex justify-between text-zinc-400 text-xs mt-1">
								<span>$0</span>
								<span>${priceRange}/hour</span>
							</div>
						</div>

						{/* Capacity */}
						<div className="mb-6">
							<label className="text-white text-sm font-semibold block mb-3">Capacity</label>
							<select
								value={capacity}
								onChange={(e) => setCapacity(e.target.value)}
								className="w-full bg-[#2a3147] border border-gray-600 rounded-xl px-4 py-3 text-[#ced0d3] text-sm"
							>
								<option value="">Any capacity</option>
								<option value="1-4">1-4 people</option>
								<option value="5-10">5-10 people</option>
								<option value="10+">10+ people</option>
							</select>
						</div>

						{/* Amenities */}
						<div className="mb-6">
							<label className="text-white text-sm font-semibold block mb-3">Amenities</label>
							<div className="flex flex-col gap-3">
								{amenitiesList.map((amenity) => (
									<label key={amenity} className="flex items-center gap-3 cursor-pointer">
										<input
											type="checkbox"
											checked={selectedAmenities.includes(amenity)}
											onChange={() => toggleAmenity(amenity)}
											className="w-4 h-4 rounded border-gray-600 bg-[#2a3147] accent-[#f5a623]"
										/>
										<span className="text-zinc-300 text-sm">{amenity}</span>
									</label>
								))}
							</div>
						</div>

						{/* Date */}
						<div className="mb-6">
							<label className="text-white text-sm font-semibold block mb-3">Date</label>
							<input
								type="date"
								className="w-full bg-[#2a3147] border border-gray-600 rounded-xl px-4 py-3 text-[#ced0d3] text-sm"
							/>
						</div>

						{/* Reset */}
						<button
							onClick={resetFilters}
							className="w-full border border-white/20 text-white rounded-xl py-3 text-sm font-semibold hover:bg-white/5 transition"
						>
							Reset Filters
						</button>
					</div>
				</div>

				{/* Space cards */}
				<div className="flex-1">
					<div className="grid gap-6 sm:grid-cols-2">
						{filtered.map((space) => (
							<div key={space.id} className="bg-[#1a2035] rounded-2xl overflow-hidden border border-white/10">
								<div className="w-full h-52 overflow-hidden">
									<img src={space.imageUrl} alt={space.name} className="w-full h-full object-cover" />
								</div>
								<div className="p-5 flex flex-col gap-2">
									<h3 className="text-white text-lg font-semibold">{space.name}</h3>
									<div className="flex items-center gap-1 text-zinc-400 text-sm">
										<span>📍</span>
										<span>{space.location}</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<span className="text-[#f5a623]">★</span>
										<span className="text-white font-semibold">{space.rating}</span>
										<span className="text-zinc-400">({space.reviews} reviews)</span>
									</div>
									<div className="flex items-center gap-2 flex-wrap mt-1">
										{space.amenities.map((a) => (
											<span
												key={a}
												className="flex items-center gap-1 text-zinc-300 text-xs border border-white/10 rounded-lg px-2 py-1 bg-white/5"
											>
												{amenityIcons[a] || ''} {a}
											</span>
										))}
									</div>
									<hr className="border-white/10 mt-2" />
									<div className="flex items-center justify-between mt-1">
										<div className="text-white text-lg font-bold">
											<span className="text-[#f5a623]">${space.pricePerHour}</span>
											<span className="text-zinc-400 text-xs font-normal">/hour</span>
										</div>
										<button className="bg-[#f5a623] text-[#0f1629] text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#e09610] transition active:scale-95">
											Book now
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
