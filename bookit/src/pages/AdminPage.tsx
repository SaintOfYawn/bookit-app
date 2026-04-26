import { useState } from 'react'
import API from '../API/api'

interface Listing {
	id: number
	title: string
	city: string
	category: string
	price_per_night: number
	max_guests: number
	description: string
}

export default function AdminPage() {
	const [listings, setListings] = useState<Listing[]>([])
	const [form, setForm] = useState({
		title: "", city: "", category: "apartment",
		price_per_night: "", max_guests: "2", description: "",
	})

	const set = (key: keyof typeof form) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
			setForm({ ...form, [key]: e.target.value })

	async function handleSubmit() {
		const res = await API.post('/listings/', {
			...form,
			price_per_night: parseFloat(form.price_per_night),
			max_guests: parseInt(form.max_guests),
		})
		setListings((prev) => [res.data, ...prev])
		setForm({ title: "", city: "", category: "apartment", price_per_night: "", max_guests: "2", description: "" })
	}

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-lg mx-auto">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">Добавить место</h1>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
					<div>
						<label className="block text-sm text-gray-600 mb-1">Название</label>
						<input
							className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
							value={form.title} onChange={set("title")} placeholder="Уютная студия в центре"
						/>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="block text-sm text-gray-600 mb-1">Город</label>
							<input
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
								value={form.city} onChange={set("city")} placeholder="Vienna"
							/>
						</div>
						<div>
							<label className="block text-sm text-gray-600 mb-1">Категория</label>
							<select
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
								value={form.category} onChange={set("category")}
							>
								<option value="apartment">Apartment</option>
								<option value="house">House</option>
								<option value="hotel">Hotel</option>
							</select>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="block text-sm text-gray-600 mb-1">Цена / ночь (€)</label>
							<input
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
								type="number" value={form.price_per_night} onChange={set("price_per_night")} placeholder="89"
							/>
						</div>
						<div>
							<label className="block text-sm text-gray-600 mb-1">Макс. гостей</label>
							<input
								className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
								type="number" value={form.max_guests} onChange={set("max_guests")} placeholder="2"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm text-gray-600 mb-1">Описание</label>
						<textarea
							className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 resize-none"
							rows={3} value={form.description} onChange={set("description")} placeholder="Коротко об объекте..."
						/>
					</div>

					<button
						onClick={handleSubmit}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg py-2.5 transition-colors"
					>
						Добавить
					</button>
				</div>

				{listings.length > 0 && (
					<div className="mt-6 space-y-2">
						{listings.map((l) => (
							<div key={l.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex justify-between items-center">
								<div>
									<p className="text-sm font-medium text-gray-800">{l.title}</p>
									<p className="text-xs text-gray-400">{l.city} · {l.category}</p>
								</div>
								<span className="text-sm font-semibold text-gray-700">€{l.price_per_night}</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}